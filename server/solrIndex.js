import Solr from 'solr-client';
import Axios from 'axios';

import { consoleLog, consoleError } from './utils';

let exampleDocument = {
  docId_s: 'doc1',
  locale_s: 'es',
  title_t: 'My first document',
  snippet_t: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  body_t: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat semper eleifend. Aliquam erat volutpat. Quisque efficitur ullamcorper tortor, nec imperdiet nibh sollicitudin ut. Cras libero quam, porttitor sit amet pellentesque sed, lacinia eget dolor. Nam vulputate non arcu vel viverra. Duis vitae arcu eu lacus accumsan aliquet.',
  keywords_t: [ 'lorem', 'elit' ],
  url_s: 'www.myexample.com'
};


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
    // TODO addOne
  }

  addMany(docArray) {
    // TODO addMany
  }

  deleteAll() {
    let field = 'id';
    let query = '*';

    return new Promise((resolve, reject) => {
      this.client.delete(field, query, (err, res) => {
        if (err) {
          consoleError('Error while deleting all on Solr Index!');
          reject(err);
        }
        else {
          consoleLog('All documents deleted on Solr Index!');
          resolve(res);
        }
      });
    });
  }

  query(queryString) {
    // TODO query
  }

  changeLocale(localeCode, addOperation = true) {
    let solrUrl = `http://${this.options.host}:${this.options.port}/solr/${this.options.core}/schema/fields?wt=json`;
    let locale = `text_${localeCode}`;
    let operation = addOperation ? 'add-field' : 'replace-field';

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
        .then((res) => {
          consoleLog('Changed locale on Solr Index!', locale);
          resolve(res.data);
        })
        .catch((err) => {
          consoleError('Error while changing locale on Solr Index!');
          reject(err);
        });
    });
  }
}

export default SolrIndex;