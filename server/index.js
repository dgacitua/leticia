import "core-js/stable";
import "regenerator-runtime/runtime";

import http from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import SockJS from 'sockjs';
import passport from 'passport';

import { dataDb, userDb } from './db';
import * as Constants from './constants';

import api1 from './api1';
import { consoleLog, consoleError } from './utils';
import { redirectInteraction } from './websocketRouter';

const app = express();
const port = 3001;
const wsPort = 3002;
const echo = SockJS.createServer();

let corsOptions = {
  origin: Constants.isProductionMode ? `${Constants.corsUrl}` : 'http://localhost:3000'
};

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
//app.use(helmet());
app.use(passport.initialize());

// Proxy support
// https://stackoverflow.com/a/14631683
app.set('trust proxy', true);

// CORS support
app.use(cors());

// Static assets support
app.use('/assets', express.static(Constants.assetPath));

// Add REST routes
app.use('/v1', api1);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LeTiCiA API!' });
});

// WebSocket event handler
/*
echo.on('connection', (conn) => {
  conn.on('data', (message) => { redirectInteraction(message) });
  conn.on('close', () => {});
});
*/

const server = http.createServer();
//echo.installHandlers(server, { prefix: '/ws' });

app.listen(port, '0.0.0.0', () => consoleLog(`Backend REST API listening on port ${port}!`));
// server.listen(wsPort, '0.0.0.0', () => consoleLog(`Backend WebSocket API listening on port ${wsPort}!`));