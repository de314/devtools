const { rpcRegistry } = require('../../RpcRegistry');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

const UUID_PATTERN = '^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$';

const getHandle = (uuidFunc) => async (params) => {
  const { count = 1 } = params;
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(uuidFunc());
  }
  return result;
};

const spec = [
  {
    key: 'utils.uuid.v1',
    description:
      'Version 1 (timestamp) - Created from the system clock (plus random values)',
    requestDefinition: {
      schema: {
        type: 'object',
        properties: {
          count: {
            type: 'number',
          },
        },
      },
      examples: [{}, { count: 3 }],
    },
    responseDefinition: {
      schema: {
        type: 'array',
        items: {
          type: 'string',
          description: "Version 1 UUID's using current timestamp",
          pattern: UUID_PATTERN,
        },
      },
      examples: [
        ['b06e70b0-7158-11ea-b1d4-8bdde097786b'],
        [
          'b06e70b1-7158-11ea-b1d4-8bdde097786b',
          'b06e70b2-7158-11ea-b1d4-8bdde097786b',
          'b06e70b3-7158-11ea-b1d4-8bdde097786b',
        ],
      ],
    },
    handle: getHandle(uuidv1),
  },
  {
    key: 'utils.uuid.v4',
    description:
      'Version 4 (random) - Created from cryptographically-strong random values',
    requestDefinition: {
      schema: {
        type: 'object',
        properties: {
          count: {
            type: 'number',
          },
        },
      },
      examples: [{}, { count: 3 }],
    },
    responseDefinition: {
      schema: {
        type: 'array',
        items: {
          type: 'string',
          description: "Version 4 UUID's",
          pattern: UUID_PATTERN,
        },
      },
      examples: [
        ['34ee5c6f-5dcd-4b01-8291-5de5e8f1214a'],
        [
          'bcc9ba74-b11f-41e1-a572-a904e900166d',
          '177a5faa-24b5-473b-adbf-41df32437cc9',
          '44cc1354-327b-4671-a1f3-59bfb2c7a7fa',
        ],
      ],
    },
    handle: getHandle(uuidv4),
  },
];

rpcRegistry.registerAll(spec);

module.exports = spec;
