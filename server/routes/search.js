import express from 'express';

import * as Constants from '../constants';
import { consoleError, consoleLog } from '../utils';

import SolrIndex from '../components/solrIndex';

let solrOptions = {
  host: Constants.solrHost,
  port: Constants.solrPort,
  core: Constants.solrCore
};

const index = new SolrIndex(solrOptions);
const router = express.Router();

const add = async (request, response, next) => {
  try {
    let docArray = request.body;

    await index.addMany(docArray);
    
    response.status(200).send({ status: 'Documents Saved!', amount: docArray.length, timestamp: Date.now() });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Documents', errorObj: err });
  }
}

const search = async (request, response, next) => {
  try {
    let queryString = encodeURI(request.query.q);
    let pageStart = request.query.p || 1;

    let searchResult = await index.search(queryString, pageStart);
    
    response.status(200).send({ status: 'Search OK!', timestamp: Date.now(), result: searchResult });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while searching Documents', errorObj: err });
  }
}

const deleteAll = async (request, response, next) => {
  try {
    await index.deleteAll();
    
    response.status(200).send({ status: 'All documents deleted!', timestamp: Date.now() });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting all documents', errorObj: err });
  }
}

const changeLocale = async (request, response, next) => {
  try {
    let body = request.body;
    let locale = body.locale;
    let addOperation = body.addOperation;

    await index.changeLocale(locale, addOperation);
    
    response.status(200).send({ status: 'Index locale changed!', locale: locale, timestamp: Date.now() });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while changing index locale', errorObj: err });
  }
}

router.post('/locale', changeLocale);
router.get('/', search);
router.post('/', add);
router.delete('/', deleteAll);

export default router;