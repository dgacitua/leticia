import "core-js/stable";
import "regenerator-runtime/runtime";

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import SockJS from 'sockjs';
import passport from 'passport';

import './db';
import * as Constants from './constants';

import api1 from './api1';
import { redirectInteraction } from './websocketRouter';

const app = express();
const port = 3001;
const wsPort = 3002;
const echo = SockJS.createServer();

let corsOptions = {
  origin: Constants.isProductionMode ? `${Constants.corsUrl}` : 'http://localhost:3000'
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize()); 

// Proxy support
// https://stackoverflow.com/a/14631683
app.set('trust proxy', true);

// CORS support
app.use(cors());

// Add REST routes
app.use('/v1', api1);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LeTiCiA API!' });
});

// WebSocket event handler
echo.on('connection', (conn) => {
  conn.on('data', (message) => { redirectInteraction(message) });
  conn.on('close', () => {});
});

const server = http.createServer();
echo.installHandlers(server, { prefix: '/ws' });

app.listen(port, '0.0.0.0', () => console.log(`Backend REST API listening on port ${port}!`));
// server.listen(wsPort, '0.0.0.0', () => console.log(`Backend WebSocket API listening on port ${wsPort}!`));