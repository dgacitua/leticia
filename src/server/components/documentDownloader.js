// Based on NEURONE implementation by Daniel Gacitúa
// https://github.com/NEURONE-IL/neurone

import fs from 'fs-extra';
import url from 'url';
import path from 'path';
import iconv from 'iconv';
import charset from 'charset';
import cheerio from 'cheerio';
import { htmlToText } from 'html-to-text';
import scrape from 'website-scraper';
import PhantomScrape from 'website-scraper-phantom';

import * as Constants from '../constants';
import { consoleLog, consoleError, isString } from '../utils';
import Document from '../models/Document';
import SolrIndex from './solrIndex';

const solrOptions = {
  host: Constants.solrHost,
  port: Constants.solrPort,
  core: Constants.solrCore
};

class DocumentDownloader {
  constructor() {
    this.queryDocPath = path.join('/assets/documents');
    this.queryPreviewPath = path.join('/assets/preview');
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.7113.93 Safari/537.36';
    this.index = new SolrIndex(solrOptions);

    this.createDownloadDirs();
  }

  // Create download directories (or at least ensure they are created)
  createDownloadDirs() {
    try {
      fs.ensureDirSync(Constants.documentPath);
      fs.ensureDirSync(Constants.previewPath);
    }
    catch (err) {
      consoleError('Error while creating document directories!', err);
      throw err;
    }
  }

  // Get domain from URL
  getDomainUrl(originUrl) {
    if (isString(originUrl)) return url.parse(originUrl).hostname.replace(/^(www\.)(.+)/i, '$2');
    else return '';
  }

  // Escape newline characters on a JSON string
  escapeString(str) {
    // dgacitua: http://stackoverflow.com/a/9204218
    return str
      .replace(/[\\]/g, ' ')
      .replace(/[\"]/g, ' ')
      .replace(/[\/]/g, ' ')
      .replace(/[\b]/g, ' ')
      .replace(/[\f]/g, ' ')
      .replace(/[\n]/g, ' ')
      .replace(/[\r]/g, ' ')
      .replace(/[\t]/g, ' ');
  }

  // Read HTML file as string (and convert to UTF-8)
  readFile(path) {
    try {
      // dgacitua: http://stackoverflow.com/a/18711982
      let htmlBuffer = fs.readFileSync(path);
      let htmlString = htmlBuffer.toString();
      let encoding = charset([], htmlString);   // || jschardet.detect(htmlString).encoding.toLowerCase();

      if (encoding === 'utf-8' || encoding === 'utf8' || !encoding) {
        return htmlString;
      }
      else {
        let ic = new iconv.Iconv(encoding, 'UTF-8//TRANSLIT//IGNORE');
        let buf = ic.convert(htmlBuffer);
        let str = buf.toString('utf-8');

        return str;
      }
    }
    catch (err) {
      consoleError('Error while reading HTML file!', err);
      throw err;
    }
  }

  // Get readable text (no tags) from HTML
  getTextFromHtml(path) {
    try {
      let htmlString = this.readFile(path);

      let options = {
        wordwrap: false,
        tags: {
          'a': { options: { ignoreHref: true } },
          'img': { format: 'skip' },
          'ul': { options: { itemPrefix: ' ' } }
        }
      };

      let extractedText = htmlToText(htmlString, options);
      return this.escapeString(extractedText);
    }
    catch (err) {
      consoleError('Error while getting text from HTML file!', err);
      throw err;
    }
  }

  // Clean document (remove links, inputs, forms and javascript)
  cleanDocument(documentPath, originUrl) {
    try {
      let relPath = documentPath;
      let fileDir = path.dirname(relPath);
      let fileExt = path.extname(relPath);
      let fileName = path.basename(relPath, fileExt);
      let newFilename = fileName + fileExt;
      let pageDomain = this.getDomainUrl(originUrl);

      let htmlFile = this.readFile(relPath);
      let htmlString = htmlFile.toString();
      let $ = cheerio.load(htmlFile);

      // dgacitua: Remove onclick attribute from anchor tags
      $('a').each((i, elem) => {
        $(elem).removeAttr('onclick');
      });

      // dgacitua: Remove all external links
      $('a[href]').each((i, elem) => {
        $(elem).attr('href', 'javascript:void(0)');
        $(elem).removeAttr('target');
      });

      // dgacitua: Remove all iframes and frames
      $('iframe,frame').each((i, elem) => {
        $(elem).remove();
      });

      // dgacitua: Remove javascript
      $('script').each((i, elem) => {
        $(elem).remove();
      });

      // dgacitua: Remove onclick attribute from all tags
      $('[onclick]').each((i, elem) => {
        $(elem).removeAttr('onclick');
      });

      // dgacitua: Disable input elements
      $('input').each((i, elem) => {
        $(elem).removeAttr('id');
        $(elem).attr('disabled', 'true');
      });

      // dgacitua: Disable button elements
      $('button').each((i, elem) => {
        $(elem).removeAttr('id');
        $(elem).attr('disabled', 'true');
      });

      // dgacitua: Disable submit
      $('[type="submit"]').each((i, elem) => {
        $(elem).removeAttr('type');
      });

      // dgacitua: Disable form action
      $('form').each((i, elem) => {
        $(elem).removeAttr('action');
        $(elem).removeAttr('method');
      });

      let cleanedHtml = $.html();

      fs.writeFileSync(path.join(fileDir, newFilename), cleanedHtml);
    
      return true;
    }
    catch (err) {
      consoleError('Error while cleaning document!', err);
      throw err;
    }
  }

  // Download document to local filesystem
  async downloadDocument(docName, sourceUrl, isIndexable = true) {
    try {
      let downloadPath = isIndexable ? path.join(Constants.documentPath, docName) : path.join(Constants.previewPath, 'currentDocument');
      let queryPath = isIndexable ? path.join(this.queryDocPath, docName) : path.join(this.queryPreviewPath, 'currentDocument');
      let urlObject = new URL(sourceUrl);
      let parsedUrl = urlObject.href;

      let options = {
        urls: [ parsedUrl ],
        directory: downloadPath,
        filenameGenerator: 'bySiteStructure', //'byType',
        recursive: false,
        httpResponseHandler: (response) => {
          const htmlBody = response.headers['content-type'].startsWith('text/html') && response.body;
          const re = /((https?:\/\/)(\w+)(.disqus.com))/;
          if (htmlBody && re.test(htmlBody)) {
            const updatedHtmlBody = htmlBody.replace(re, ''); 
            return Promise.resolve(updatedHtmlBody);
          }
          else {
            return Promise.resolve(response.body);
          }
        },
        request: {
          headers: { 'User-Agent': this.userAgent }
        },
        urlFilter: (url) => {
          return (url.indexOf(urlObject.host) !== -1 || this.detectImageUrl(url)) && (url.indexOf('data:image') === -1);
        },
        //plugins: [ new PhantomScrape() ]
      }

      fs.removeSync(downloadPath);

      let download = await scrape(options);

      let response = {
        docName: docName,
        pageUrl: download[0].url,
        route: path.join(queryPath, download[0].filename),
        fullPath: path.join(downloadPath, download[0].filename)
      };
      
      return response;
    }
    catch (err) {
      consoleError('Error while downloading document!', err);
      throw err;
    }
  }

  // Download and index document
  async indexDocument(docObj) {
    try {
      consoleLog('Attempting to download and index document!');

      let docMetadata = {
        docId: docObj.docId,
        locale: docObj.locale || 'en',
        title: docObj.title || 'NewDocument',
        snippet: docObj.snippet || '',
        body: '',
        keywords: docObj.keywords || [],
        url: docObj.url || '',
        relevant: docObj.relevant || []
      };

      let download = await this.downloadDocument(docMetadata.docId, docMetadata.url, true);
      docMetadata.path = download.route;
      docMetadata.body = this.getTextFromHtml(download.fullPath);

      consoleLog('Document successfully downloaded!');

      this.cleanDocument(download.fullPath, docMetadata.url);

      consoleLog('Document successfully cleaned!');

      let indexedDocument = {
        docId_s: docMetadata.docId,
        locale_s: docMetadata.locale,
        title_t: docMetadata.title,
        snippet_t: docMetadata.snippet,
        body_t: docMetadata.body,
        keywords_t: docMetadata.keywords,
        url_s: docMetadata.url,
        path_s: docMetadata.path,
        relevant_s: docMetadata.relevant
      }
      
      await Document.create(docMetadata);
      await this.index.addOne(indexedDocument);

      consoleLog('Document successfully indexed!');

      return docMetadata;
    }
    catch (err) {
      consoleError('Error while indexing downloaded document!', err);
      throw err;
    }
  }

  // Download document as a preview
  async previewDocument(docObj) {
    try {
      consoleLog('Attempting to download and preview document!');

      let docMetadata = {
        docId: docObj.docId,
        locale: docObj.locale || 'en',
        title: docObj.title || 'NewDocument',
        snippet: docObj.snippet || '',
        body: '',
        keywords: docObj.keywords || [],
        url: docObj.url || '',
        relevant: docObj.relevant || []
      };

      let download = await this.downloadDocument(docMetadata.docId, docMetadata.url, false);
      docMetadata.path = download.route;
      docMetadata.body = this.getTextFromHtml(download.fullPath);

      consoleLog('Document successfully downloaded!');

      this.cleanDocument(download.fullPath, docMetadata.url);

      consoleLog('Document successfully cleaned!');

      return docMetadata;
    }
    catch (err) {
      consoleError('Error while previewing downloaded document!', err);
      throw err;
    }
  }

  // Delete one document from database and index
  async deleteOne(docId) {
    try {
      let p1 = await Document.deleteOne({ docId: docId });
      let p2 = await this.index.deleteOne(docId);

      return true;
    }
    catch (err) {
      consoleError('Error while deleting document!', err);
      throw err;
    }
  }

  // Delete all documents from database and index
  async deleteAll() {
    try {
      let p1 = await Document.deleteMany({});
      let p2 = await this.index.deleteAll();

      return true;
    }
    catch (err) {
      consoleError('Error while deleting all documents!', err);
      throw err;
    }
  }

  // Recreates all documents on inverted index (based on database)
  async reindex() {
    try {
      let p1 = await Document.find();
      let p2 = await this.index.deleteAll();

      let newDocs = p1.map(element => {
        return {
          docId_s: element.docId,
          locale_s: element.locale,
          title_t: element.title,
          snippet_t: element.snippet,
          body_t: element.body,
          keywords_t: element.keywords,
          url_s: element.url,
          path_s: element.path,
          relevant_s: element.relevant
        }
      });

      let p3 = await this.index.addMany(newDocs);

      return true;
    }
    catch (err) {
      consoleError('Error while reindexing', err);
      throw err;
    }
  }

  detectImageUrl(url) {
    return path.extname(url) === '.jpg' ||
      path.extname(url) === '.jpeg' ||
      path.extname(url) === '.webp' ||
      path.extname(url) === '.png' ||
      path.extname(url) === '.gif';
  }
}

export default DocumentDownloader;