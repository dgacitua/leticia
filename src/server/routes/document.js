import express from 'express';

import DocumentDownloader from '../components/documentDownloader';

import * as Constants from '../constants';
import { consoleLog, consoleError } from '../utils';

import Document from '../models/Document';

const router = express.Router();
const downloader = new DocumentDownloader();

/**
 * @openapi
 * 
 * tags:
 *   name: Document
 *   description: The Document Downloader handles web scraping and indexing of documents (web pages)
 * 
 */

/**
 * @openapi
 * 
 * /documents/preview:
 *    post:
 *      summary: Preview document
 *      description: Downloads the document for preview (no indexing is performed). Document access link is available on the `previewUrl` value on the response. All links and forms are disabled in the document.
 *      tags: [Document]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                docId:
 *                  description: Document identification string (must be unique among all documents)
 *                  type: string
 *                url:
 *                  description: The URL of the site to download
 *                  type: string
 *                locale:
 *                  description: Document locale, accepts ISO 639-1 language codes supported by Apache Solr (like `en`, `es` or `fi`)
 *                  type: string
 *                title:
 *                  description: Document title
 *                  type: string
 *                snippet:
 *                  description: The default text snippet shown as a surrogate from the search (in case that an automatic snippet cannot be generated)
 *                  type: string
 *                keywords:
 *                  type: array
 *                  items:
 *                    type: string                 
 *                    description: A list of keywords related to the document (when using these keywords in a search query, documents that have these receive a ranking boost, can be an empty array)
 *                relevant:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: A list of the `taskId`s where the document is relevant (can be an empty array)
 *            example:
 *              docId: doc01
 *              url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event"
 *              locale: en
 *              title: "Element: mousemove event"
 *              snippet: "The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it."
 *              keywords: [javascript, event]
 *              relevant: [task01]
 *      responses:
 *        200:
 *          description: Returns operation result message
 *        500:
 *          description: Error while downloading document preview
 *
 */
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

/**
 * @openapi
 * 
 * /documents/index:
 *    post:
 *      summary: Download and index document
 *      description: Downloads the document indicated in the `url` parameter (using the web scraper), generates a representation of the document in the database and then indexes it on the inverted index. Document access link is available on the `previewUrl` value on the response. All links and forms are disabled in the document.
 *      tags: [Document]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                docId:
 *                  description: Document identification string (must be unique among all documents)
 *                  type: string
 *                url:
 *                  description: The URL of the site to download
 *                  type: string
 *                locale:
 *                  description: Document locale, accepts ISO 639-1 language codes supported by Apache Solr (like `en`, `es` or `fi`)
 *                  type: string
 *                title:
 *                  description: Document title
 *                  type: string
 *                snippet:
 *                  description: The default text snippet shown as a surrogate from the search (in case that an automatic snippet cannot be generated)
 *                  type: string
 *                keywords:
 *                  type: array
 *                  items:
 *                    type: string                 
 *                    description: A list of keywords related to the document (when using these keywords in a search query, documents that have these receive a ranking boost, can be an empty array).
 *                relevant:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: A list of the `taskId`s where the document is relevant (can be an empty array)
 *            example:
 *              docId: doc01
 *              url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event"
 *              locale: en
 *              title: "Element: mousemove event"
 *              snippet: "The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it."
 *              keywords: [javascript, event]
 *              relevant: [task01]
 *      responses:
 *        200:
 *          description: Returns operation result message
 *        500:
 *          description: Error while downloading and indexing document
 *
 */
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

/**
 * @openapi
 * 
 * /documents/reindex:
 *    post:
 *      summary: Reindex All Documents
 *      description: Deletes all documents from the inverted index and reindexes them based on their representation on the database.
 *      tags: [Document]
 *      responses:
 *        200:
 *          description: Returns reindex operation status
 *        500:
 *          description: Error while reindexing documents
 *
 */
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

/**
 * @openapi
 * 
 * /documents/one/{docId}:
 *    delete:
 *      summary: Delete one document
 *      description: Deletes a single document (based on given `docId`) from the inverted index and the database.
 *      tags: [Document]
 *      parameters:
 *        - in: path
 *          name: docId
 *          description: Document ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns delete operation status
 *        500:
 *          description: Error while deleting document
 *
 */
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

/**
 * @openapi
 * 
 * /documents/all:
 *    delete:
 *      summary: Delete all documents
 *      description: Deletes all documents from the inverted index and the database.
 *      tags: [Document]
 *      responses:
 *        200:
 *          description: Returns delete operation status
 *        500:
 *          description: Error while deleting documents
 *
 */
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