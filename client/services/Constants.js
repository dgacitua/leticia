export const isProductionMode = (process.env.NODE_ENV === 'production');
export const leticiaHost = process.env.LETICIA_HOST || 'localhost';
export const frontendPort = process.env.FRONTEND_PORT || 3000;
export const restPort = process.env.REST_PORT || 3001;
export const wsPort = process.env.WEBSOCKET_PORT || 3002;
export const throttleTime = 250;