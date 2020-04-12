import "core-js/stable";
import "regenerator-runtime/runtime";

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SockJS from 'sockjs';

import api1 from './api1';
import { redirectInteraction } from './websocketRouter';

const app = express();
const port = 3001;
const wsPort = 3002;
const echo = SockJS.createServer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS support
app.use(cors());

// Add routes
app.use('/v1', api1);

// WebSocket event handler
echo.on('connection', (conn) => {
  conn.on('data', (message) => { redirectInteraction(message) });
  conn.on('close', () => {});
});

const server = http.createServer();
echo.installHandlers(server, { prefix: '/ws' });

app.listen(port, () => console.log(`Backend REST API listening on port ${port}!`));
server.listen(wsPort, '0.0.0.0', () => console.log(`Backend WebSocket API listening on port ${wsPort}!`));