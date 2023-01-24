import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';

dotenv.config();

// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const isProductionMode = (process.env.NODE_ENV === 'production');
export const isPilotMode = (process.env.LETICIA_PILOT_MODE === 'true');
export const leticiaHost = process.env.LETICIA_HOST || 'localhost';
export const leticiaProtocol = process.env.LETICIA_PROTOCOL || 'http';
export const leticiaPort = process.env.LETICIA_PORT || 3000;

export const solrHost = process.env.SOLR_HOST || 'localhost';
export const solrPort = process.env.SOLR_PORT || 8983;
export const solrCore = process.env.SOLR_CORE || 'leticia';

export const solrUrl = `solr://${solrHost}:${solrPort}/${solrCore}`;

export const mongoHost = process.env.MONGODB_HOST || 'localhost';
export const mongoPort = process.env.MONGODB_PORT || 27017;
export const mongoDataDB = process.env.MONGODB_DATA_DB || 'leticia-data';
export const mongoUserDB = process.env.MONGODB_USER_DB || 'leticia-user';

export const mongoDataUrl = process.env.MONGODB_DATA_URL || `mongodb://${mongoHost}:${mongoPort}/${mongoDataDB}`;
export const mongoUserUrl = process.env.MONGODB_USER_URL || `mongodb://${mongoHost}:${mongoPort}/${mongoUserDB}`;

export const jwtKey = process.env.JWT_KEY || 'none';
export const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
export const facebookClientId = process.env.FACEBOOK_CLIENT_ID || '';
export const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET || '';
export const currentSessionFlow = process.env.CURRENT_SESSION_FLOW || 'short';

export const enableFrontend = (!(!!process.env.ENABLE_FRONTEND) || process.env.ENABLE_FRONTEND === 'true');
export const enableApiDocs = (!(!!process.env.ENABLE_API_DOCS) || process.env.ENABLE_API_DOCS === 'true');

export const backendApiUrl = isProductionMode ? `${leticiaProtocol}://${leticiaHost}:${leticiaPort}` : 'http://localhost:3000';

export const assetPath = path.join(__dirname, '/assets');
export const documentPath = path.join(__dirname, '/assets/documents');
export const previewPath = path.join(__dirname, '/assets/preview');
export const frontendPath = isProductionMode ? path.join(__dirname, '/frontend') : path.resolve('dist');
export const backendPath = isProductionMode ? path.join(__dirname, '/') : path.resolve('server');