import fs from 'fs-extra';
import path from 'path';
import scrape from 'website-scraper';

import * as Constants from '../constants';
import { consoleLog, consoleError } from '../utils';

class DocumentDownloader {
  constructor() {
    this.queryDocPath = path.join('/assets/documents');
    this.queryPreviewPath = path.join('/assets/preview');
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.7113.93 Safari/537.36';

    this.createDownloadDirs();
  }

  createDownloadDirs() {
    try {
      fs.ensureDirSync(Constants.documentPath);
      fs.ensureDirSync(Constants.previewPath);
    }
    catch (err) {
      consoleError('Error while creating document directories!', err);
      throw(err);
    }
  }

  async downloadDocument(docName, sourceUrl, isIndexable = true) {
    try {
      let downloadPath = isIndexable ? path.join(Constants.documentPath, docName) : path.join(Constants.previewPath, 'currentDocument');
      let queryPath = isIndexable ? path.join(this.queryDocPath, docName) : path.join(this.queryPreviewPath, 'currentDocument');

      let options = {
        urls: [ sourceUrl ],
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
        }
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
      throw new Error('Error while indexing downloaded document!');
    }
  }

  async indexDocument(docObj) {
    try {
      let indexedDocument = {
        docId: docObj.docId,
        locale: docObj.locale || 'en',
        title: docObj.title || 'NewDocument',
        snippet: docObj.snippet || '',
        body: '',
        keywords: docObj.keywords || [],
        url: docObj.url || ''
      };

      let download = await this.downloadDocument(indexedDocument.docId, indexedDocument.url, true);

      indexedDocument.path = download.route;

      // TODO Clean document
      // TODO Add document to database
      // TODO Add document to inverted index
    }
    catch (err) {
      consoleError('Error while indexing downloaded document!', err);
      throw new Error('Error while indexing downloaded document!');
    }
  }
}

export default DocumentDownloader;