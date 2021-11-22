import { backendApiUrl, backendPath } from './constants';

export const openapiOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LETICIA',
      description: 'REST API for LETICIA',
      version: '1.0.0',
      license: {
        name: 'AGPL-3.0',
        url: 'https://opensource.org/licenses/AGPL-3.0'
      }
    },
    servers: [
      {
        url: `http://localhost:3000/v1`,
        description: 'Development local backend'
      },
      {
        url: `${backendApiUrl}/v1`,
        description: 'Environment variable based backend'
      }
    ],
  },
  apis: [ `${backendPath}/routes/*.js` ]
};