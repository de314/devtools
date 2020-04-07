const _ = require('lodash');
const { rpcRegistry } = require('./RpcRegistry');

require('./methods').init();

const INTERNAL_ERROR = {
  code: -32603,
  message: 'Internal Error',
  data: {
    errorMessage: 'Unknown',
  },
};

const stripSpec = (spec) => {
  const { key, description = '', requestDefinition, responseDefinition } = spec;
  return { key, description, requestDefinition, responseDefinition };
};

class RpcService {
  async listKeys() {
    const methods = await rpcRegistry.getMethods();
    const keys = Object.keys(methods);
    keys.sort();
    return keys;
  }
  async list(options = {}) {
    const { methodKeyPrefix, queryPhrase, cursor } = options;
    let { pageSize } = options;
    let methods = await rpcRegistry.getMethods();
    methods = _.sortBy(Object.values(methods), 'key');
    if (typeof methodKeyPrefix === 'string' && methodKeyPrefix.length > 0) {
      methods = methods.filter((spec) => spec.key.startWith(methodKeyPrefix));
    }
    if (typeof queryPhrase === 'string' && queryPhrase.length > 0) {
      const tokens = queryPhrase.split('\\w+');
      methods = methods.filter((spec) =>
        tokens.some((token) => {
          return spec.key.includes(token) || spec.description.includes(token);
        }),
      );
    }
    if (typeof cursor === 'string' && cursor.length > 0) {
      const compCursor = cursor.toUpperCase();
      methods = methods.filter((spec) => spec.key.toUpperCase() >= compCursor);
    }
    if (typeof pageSize !== 'number' || pageSize <= 0 || pageSize > 100) {
      pageSize = 20;
    }
    if (methods.size > pageSize) {
      const tmp = [];
      for (let i = 0; i < pageSize; i++) {
        tmp.push(methods[i]);
      }
      methods = tmp;
    }
    return methods.map((spec) => stripSpec(spec));
  }
  async details(methodKey) {
    let method = await rpcRegistry.getMethod(methodKey);
    if (!!method) {
      method = stripSpec(method);
    }
    return method;
  }
  async handle(rpcRequest) {
    const { method, params, id } = rpcRequest;
    const methodSpec = await rpcRegistry.getMethod(method);
    if (!methodSpec) {
      return null;
    }
    try {
      const result = await methodSpec.handle(params);
      return {
        jsonrpc: '2.0',
        result,
        id,
      };
    } catch (error) {
      const { code, message, data } = error;
      if (code) {
        return {
          jsonrpc: '2.0',
          error: { code, message, data },
          id,
        };
      } else {
        return {
          jsonrpc: '2.0',
          error: {
            code: INTERNAL_ERROR.code,
            message: INTERNAL_ERROR.message,
            data: INTERNAL_ERROR.data,
          },
          id,
        };
      }
    }
  }
}

RpcService.rpcService = new RpcService();

module.exports = RpcService;
