import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import { dataDb, userDb } from './db.js';
import * as Constants from './constants.js';
import { openapiOptions } from './openapi.js';

import api1 from './api1.js';
import { consoleLog, consoleError, reportConfigStatus } from './utils.js';

const app1 = express();
const app2 = express();

const port = 3000;
const openapiPort = 3001;
const openapiSpec = swaggerJSDoc(openapiOptions);

app1.use(bodyParser.json({ limit: '10mb' }));
app1.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app1.use(cookieParser());
app1.use(passport.initialize());

// Proxy support
// https://stackoverflow.com/a/14631683
app1.set('trust proxy', true);

// CORS support
app1.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Static assets support
app1.use('/assets', express.static(Constants.assetPath));
app1.use('/assets/documents/*', (req, res) => {
  res.status(404).send({ message: 'Document Not Found' });
});

// LETICIA Public API (v1)
app1.use('/v1', api1);

// LETICIA Frontend
if (Constants.enableFrontend) {
  app1.use(history());
  app1.use(express.static(Constants.frontendPath));
  app1.get('/', (req, res) => {
    res.sendFile(path.join(Constants.frontendPath, 'index.html'));
  });
}

// Deploy LETICIA Application
app1.listen(port, '0.0.0.0', () => consoleLog(`LETICIA Web App deployed on port ${port}`));

// Deploy OpenAPI documentation for LETICIA's API
if (Constants.enableApiDocs) {
  app2.use('/openapi', swaggerUi.serve, swaggerUi.setup(openapiSpec));
  app2.listen(openapiPort, '0.0.0.0', () => consoleLog(`LETICIA's OpenAPI documentation deployed on port ${openapiPort}`));
}

// Report LETICIA's config options
reportConfigStatus(Constants);