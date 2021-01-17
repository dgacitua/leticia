import express from 'express';

import DocumentDownloader from '../components/documentDownloader';

import * as Constants from '../constants';
import { consoleLog, consoleError } from '../utils';

import Document from '../models/Document';

const router = express.Router();
const downloader = new DocumentDownloader();

const previewDocument = async (request, response, next) => {
  try {
    let docObject = request.body;
    let docMetadata = await downloader.previewDocument(docObject);

    //consoleLog('Metadata', docMetadata.body);
        
    response.status(200).send({ status: 'Document downloaded for preview!', docId: docMetadata.docId, previewUrl: `${Constants.backendApiUrl}${docMetadata.path}` });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while previewing document!', errorObj: err });
  }
}

const indexDocument = async (request, response, next) => {
  try {
    let docObject = request.body;
    let docMetadata = await downloader.indexDocument(docObject);

    //consoleLog('Metadata', docMetadata.body);
        
    response.status(200).send({ status: 'Document downloaded for indexing!', docId: docMetadata.docId, previewUrl: `${Constants.backendApiUrl}${docMetadata.path}` });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while indexing document!', errorObj: err });
  }
}

const reindex = async (request, response, next) => {
  try {
    let result = await downloader.reindex();
        
    response.status(200).send({ status: 'Documents reindexed!' });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while reindexing!', errorObj: err });
  }
}

const deleteOne = async (request, response, next) => {
  try {
    let docId = request.params.docId;
    let result = await downloader.deleteOne(docId);
        
    response.status(200).send({ status: 'Document deleted!' });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting document!', errorObj: err });
  }
}

const deleteAll = async (request, response, next) => {
  try {
    let result = await downloader.deleteAll();
        
    response.status(200).send({ status: 'All documents deleted!'});
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting all documents!', errorObj: err });
  }
}

router.post('/preview', previewDocument);
router.post('/index', indexDocument);
router.post('/reindex', reindex);
router.delete('/all', deleteAll);
router.delete('/one/:docId', deleteOne);

export default router;