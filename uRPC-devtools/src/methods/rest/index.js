const { rpcRegistry } = require('../../RpcRegistry');
// TODO: Setup a way to mock this.
const axios = require('axios');

const spec = [
  {
    key: 'web.rest.execute',
    description: 'Execute REST API Call using Axios compliant params',
    requestDefinition: {
      schema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description:
              '`url` is the server URL that will be used for the request',
            pattern: 'https?://.*',
          },
          method: {
            type: 'string',
            description:
              "`method` is the request method to be used when making the request. Default 'GET'",
            pattern: '^[a-zA-Z]{3,10}$',
          },
          headers: {
            type: 'object',
            description: '`headers` are custom headers to be sent',
          },
          params: {
            type: 'object',
            description:
              '`params` are the URL parameters to be sent with the request. Must be a plain object or a URLSearchParams object.',
          },
          data: {
            type: 'object',
            description:
              "`data` is the data to be sent as the request body. Only applicable for request methods 'PUT', 'POST', and 'PATCH'",
          },
          timeout: {
            type: 'number',
            description:
              '`timeout` specifies the number of milliseconds before the request times out. If the request takes longer than `timeout`, the request will be aborted. default is `0` (no timeout)',
          },
        },
        required: ['url'],
      },
      examples: [{ url: 'https://postman-echo.com/get' }],
    },
    responseDefinition: {
      schema: {
        type: 'object',
        properties: {
          data: {
            type: ['null', 'object', 'string'],
            description:
              '`data` is the response that was provided by the server',
          },
          headers: {
            type: ['null', 'object'],
            description:
              '`headers` the headers that the server responded with all header names are lower cased',
          },
          status: {
            type: 'number',
            description:
              '`status` is the HTTP status code from the server response',
          },
          statusText: {
            type: 'string',
            description:
              '`statusText` is the HTTP status message from the server response',
          },
        },

        required: ['data', 'headers', 'status', 'statusText'],
      },
      examples: [],
    },
    async handle(params) {
      try {
        const { data, headers, status, statusText } = await axios(params);
        return { data, headers, status, statusText };
      } catch (err) {
        // console.error('Failed rest request', err);
        const {
          data = null,
          headers = null,
          status = 499,
          statusText = 'No Request',
        } = err.response || {};
        return { data, headers, status, statusText };
      }
    },
  },
];

rpcRegistry.registerAll(spec);

module.exports = spec;
