export const isProductionMode = (process.env.NODE_ENV === 'production');
export const leticiaHost = process.env.LETICIA_HOST || 'localhost';
export const frontendPort = process.env.FRONTEND_PORT || 3000;
export const restPort = process.env.REST_PORT || 3001;
export const wsPort = process.env.WEBSOCKET_PORT || 3002;
export const throttleTime = 250;

export const pretaskForm = 'pretask';
export const posttaskForm = 'posttask';
export const queryForm = 'query';

export const frontendUrl = `${location.protocol}//${leticiaHost}:${frontendPort}`;
export const backendApiUrl = `${location.protocol}//${leticiaHost}:${restPort}/v1`;
export const backendWebsocketUrl = `${location.protocol}//${leticiaHost}:${wsPort}/ws`;