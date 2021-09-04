export const isProductionMode = (process.env.NODE_ENV === 'production');
export const isPilotMode = (process.env.LETICIA_PILOT_MODE === 'true');
export const leticiaHost = process.env.LETICIA_HOST || 'localhost';
export const leticiaPort = process.env.LETICIA_PORT || 3000;
export const throttleTime = 250;

export const pretaskForm = 'pretask';
export const posttaskForm = 'posttask';
export const pretaskFormEx = 'pretask-ex';
export const posttaskFormEx = 'posttask-ex';
export const queryForm = 'query';

export const frontendUrl = `${location.protocol}//${leticiaHost}:${leticiaPort}`;
export const backendUrl = `${location.protocol}//${leticiaHost}:${leticiaPort}`;
export const backendApiUrl = `${location.protocol}//${leticiaHost}:${leticiaPort}/v1`;

export const enableGoogleLogin = (process.env.ENABLE_GOOGLE_LOGIN === 'true');
export const enableFacebookLogin = (process.env.ENABLE_FACEBOOK_LOGIN === 'true');
export const enableEmailLogin = (process.env.ENABLE_EMAIL_LOGIN === 'true');