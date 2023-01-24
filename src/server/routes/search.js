import express from 'express';

import * as Constants from '../constants.js';
import { consoleError, consoleLog } from '../utils.js';

import SolrIndex from '../components/solrIndex.js';

let solrOptions = {
  host: Constants.solrHost,
  port: Constants.solrPort,
  core: Constants.solrCore
};

const index = new SolrIndex(solrOptions);
const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: Search
 *   description: Functionalities related to LETICIA's inverted index
 * 
 */

const add = async (request, response, next) => {
  try {
    let docArray = request.body;

    await index.addMany(docArray);
    
    response.status(200).send({ status: 'Documents Saved!', amount: docArray.length, timestamp: Date.now() });
  }
  catch (err) {
    //consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Documents', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /search:
 *    get:
 *      summary: Performs a search in LETICIA's inverted index
 *      tags: [Search]
 *      parameters:
 *        - in: query
 *          name: q
 *          description: Query string
 *          schema:
 *            type: string
 *        - in: query
 *          name: p
 *          description: Result page number (default is 1, with 10 results per page)
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Returns search results
 *        500:
 *          description: Error while performing search
 *
 */
const search = async (request, response, next) => {
  try {
    let queryString = request.query.q || "";
    let pageStart = request.query.p || 1;

    let searchResult = await index.search(queryString, pageStart);
    
    response.status(200).send({ status: 'Search OK!', timestamp: Date.now(), result: searchResult });
  }
  catch (err) {
    //consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while searching Documents', errorObj: err });
  }
}

const deleteAll = async (request, response, next) => {
  try {
    await index.deleteAll();
    
    response.status(200).send({ status: 'All documents deleted!', timestamp: Date.now() });
  }
  catch (err) {
    //consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting all documents', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /search/locale:
 *    post:
 *      summary: Changes the inverted index locale for newly added documents
 *      description: This affects operations like stemming and stopword removal while indexing documents. The parameter locale accepts ISO 639-1 language codes accepted and supported by Apache Solr (like `en`, `es` or `fi`) and the parameter `addOperation` must be set to `true` if the inverted index has no documents (otherwise, set it to `false`). You must reindex all documents to make effective this change on already indexed documents.
 *      tags: [Search]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                locale:
 *                  type: string
 *                addOperation:
 *                  type: boolean
 *            example:
 *              locale: en
 *              addOperation: true
 *      responses:
 *        200:
 *          description: Returns operation result message
 *        500:
 *          description: Error while performing locale change
 *
 */
const changeLocale = async (request, response, next) => {
  try {
    let body = request.body;
    let locale = body.locale;
    let addOperation = body.addOperation;

    await index.changeLocale(locale, addOperation);
    
    response.status(200).send({ status: 'Index locale changed!', locale: locale, timestamp: Date.now() });
  }
  catch (err) {
    //consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while changing index locale', errorObj: err });
  }
}

router.post('/locale', changeLocale);
router.get('/', search);
router.post('/', add);
router.delete('/', deleteAll);

export default router;