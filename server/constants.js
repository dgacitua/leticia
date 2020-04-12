import dotenv from 'dotenv';

dotenv.config();

export const isProductionMode = (process.env.NODE_ENV === 'production');
export const leticiaHost = process.env.LETICIA_HOST || 'localhost';
export const leticiaPort = process.env.REST_PORT || 3001;
export const websocketPort = process.env.WEBSOCKET_PORT || 3002;

export const mongoUrl = process.env.MONGODB_URL || 'Your MongoDB URI here';
export const jwtKey = process.env.JWT_KEY || 'Your JWT key';