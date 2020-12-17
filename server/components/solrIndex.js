import Solr from 'solr-client';
import Axios from 'axios';

import { consoleLog, consoleError } from '../utils';

let exampleDocument = {
  docId_s: 'doc1',
  locale_s: 'es',
  title_t: 'My first document',
  snippet_t: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  body_t: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat semper eleifend. Aliquam erat volutpat. Quisque efficitur ullamcorper tortor, nec imperdiet nibh sollicitudin ut. Cras libero quam, porttitor sit amet pellentesque sed, lacinia eget dolor. Nam vulputate non arcu vel viverra. Duis vitae arcu eu lacus accumsan aliquet.',
  keywords_t: [ 'lorem', 'elit' ],
  url_s: 'www.myexample.com'
};

const DOCS_PER_PAGE = 10;

// dgacitua: http://lbdremy.github.io/solr-node-client/
class SolrIndex {
  constructor(options) {
    consoleLog('Connecting to Solr Index!');

    this.options = options;

    this.client = Solr.createClient({
      host: options.host,
      port: options.port,
      core: options.core
    });

    this.client.autoCommit = true;
  }

  ping() {
    return new Promise((resolve, reject) => {
      this.client.ping((err, res) => {
        if (err) {
          consoleError('Error while pinging to Solr Index!');
          reject(err);
        }
        else {
          consoleLog('Ping successful to Solr Index!');
          resolve(res);
        }
      });
    });
  }

  addOne(docObj) {
    let docs = [ docObj ];

    return new Promise((resolve, reject) => {
      this.client.add(docs, (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
      });
    });
  }

  addMany(docArray) {
    return new Promise((resolve, reject) => {
      this.client.add(docArray, (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
      });
    });
  }

  deleteAll() {
    let field = 'id';
    let query = '*';

    return new Promise((resolve, reject) => {
      this.client.delete(field, query, (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
      });
    });
  }

  search(queryString, pageStart = 1) {
    // dgacitua: IMPORTANT! Query strings must be URI encoded
    let start = (pageStart - 1) * DOCS_PER_PAGE;
    let searchQuery = `title_t:${queryString} OR body_t:${queryString} OR keywords_t:${queryString}`;
    let hlQuery = encodeURI(`hl=on&hl.q=${queryString}&hl.fl=body_t&hl.snippets=3&hl.simple.pre=<em class="hl">&hl.simple.post=</em>&hl.fragmenter=regex&hl.regex.slop=0.2`);

    let query = this.client.createQuery()
      .q(searchQuery)
      //.q({ title_t: queryString, body_t: queryString, keywords_t: queryString })
      .set(hlQuery)
      .start(start)
      .rows(DOCS_PER_PAGE);

    return new Promise((resolve, reject) => {
      this.client.search(query, (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
      });
    }); 
  }

  changeLocale(localeCode, addOperation) {
    let solrUrl = `http://${this.options.host}:${this.options.port}/solr/${this.options.core}/schema/fields?wt=json`;
    let locale = `text_${localeCode}`;
    let operation = (!!addOperation) ? 'add-field' : 'replace-field';

    let query = {
      [operation]: [
        {
          "name": "title_t",
          "type": locale,
          "indexed": true,
          "stored": true,
          "termVectors": true,
          "termPositions": true
        },
        {
          "name": "body_t",
          "type": locale,
          "indexed": true,
          "stored": true,
          "termVectors": true,
          "termPositions": true
        },
        {
          "name": "keywords_t",
          "type": locale,
          "indexed": true,
          "stored": true,
          "multiValued": true,
          "termVectors": true,
          "termPositions": true
        }
      ]
    };

    return new Promise((resolve, reject) => {
      Axios.post(solrUrl, query)
        .then((res) => { resolve(res.data) })
        .catch((err) => { reject(err) });
    });
  }
}

export default SolrIndex;