const expect = require('chai').expect;
const restHandlers = require('../../src/methods/rest');
const { schemaService } = require('../../src/SchemaService.js');

const methods = {};
restHandlers.forEach(method => (methods[method.key] = method));

describe('RPC => Rest Namespace', () => {
  describe('rest.execute', () => {
    const method = methods['rest.execute'];
    const compiled = schemaService.compile(method.responseDefinition.schema);
    const checkResponse = response => {
      const result = compiled.validate(response);
      expect(result.errors).to.be.undefined;
      expect(result.valid).to.be.true;
    };
    it('should make live request', async () => {
      const params = {
        url: 'https://postman-echo.com/post',
        method: 'POST',
        params: { foo: 'bar' },
        data: { num: 42 },
        headers: {
          token: 'Bearer asdf-123-fake',
        },
      };
      const response = await method.handle(params);
      checkResponse(response);
      delete response.headers;
      expect(response).to.deep.equal({
        data: {
          args: { foo: 'bar' },
          data: { num: 42 },
          files: {},
          form: {},
          headers: {
            'x-forwarded-proto': 'https',
            host: 'postman-echo.com',
            'content-length': '10',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json;charset=utf-8',
            token: 'Bearer asdf-123-fake',
            'user-agent': 'axios/0.19.2',
            'x-forwarded-port': '443',
          },
          json: { num: 42 },
          url: 'https://postman-echo.com/post?foo=bar',
        },
        status: 200,
        statusText: 'OK',
      });
    });
  });
});
