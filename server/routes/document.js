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

    consoleLog('Metadata', docMetadata.body);
        
    response.status(200).send({ status: 'Document downloaded for preview!', docId: docMetadata.docId, path: `${Constants.backendApiUrl}${docMetadata.path}` });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while previewing document!', errorObj: err });
  }
}

router.post('/preview', previewDocument);

export default router;