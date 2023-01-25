export const isProductionMode = (import.meta.env.VITE_NODE_ENV === 'production');
export const isPilotMode = (import.meta.env.VITE_LETICIA_PILOT_MODE === 'true');
export const leticiaHost = import.meta.env.VITE_LETICIA_HOST || 'localhost';
export const leticiaPort = import.meta.env.VITE_LETICIA_PORT || 3000;
export const throttleTime = 250;

export const pretaskForm = 'pretask';
export const posttaskForm = 'posttask';
export const pretaskFormEx = 'pretask-ex';
export const posttaskFormEx = 'posttask-ex';
export const queryForm = 'query';

export const frontendUrl = `${location.protocol}//${leticiaHost}:${leticiaPort}`;
export const backendUrl = `${location.protocol}//${leticiaHost}:${leticiaPort}`;
export const backendApiUrl = `${location.protocol}//${leticiaHost}:${leticiaPort}/v1`;

export const enableGoogleLogin = (import.meta.env.VITE_ENABLE_GOOGLE_LOGIN === 'true');
export const enableFacebookLogin = (import.meta.env.VITE_ENABLE_FACEBOOK_LOGIN === 'true');
export const enableEmailLogin = (import.meta.env.VITE_ENABLE_EMAIL_LOGIN === 'true');

export const locale = import.meta.env.VITE_LETICIA_LOCALE || 'en';
export const currentSessionFlow = import.meta.env.VITE_CURRENT_SESSION_FLOW || 'none';