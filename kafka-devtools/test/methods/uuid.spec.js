const expect = require('chai').expect;
const uuidHandlers = require('../../src2/methods/uuid');
const { schemaService } = require('../../src2/SchemaService.js');

const methods = {};
uuidHandlers.forEach(method => (methods[method.key] = method));

describe('RPC => Utils => UUID Namespace', () => {
  describe('utils.uuid.v1', () => {
    const method = methods['utils.uuid.v1'];
    const checkResponse = schemaService.compile(
      method.responseDefinition.schema,
    );
    it('should create one by default', async () => {
      const response = await method.handle({});
      expect(response).to.not.be.null;
      expect(response.length).to.equal(1);
      expect(response[0]).to.be.a('string');
      checkResponse(response);
      expect(checkResponse.errors).to.be.null;
    });
    it('should create one', async () => {
      const response = await method.handle({ count: 1 });
      expect(response.length).to.equal(1);
      checkResponse(response);
      expect(checkResponse.errors).to.be.null;
    });
    it('should create multiple', async () => {
      const response = await method.handle({ count: 10 });
      expect(response.length).to.equal(10);
      checkResponse(response);
      expect(checkResponse.errors).to.be.null;
    });
  });
  describe('utils.uuid.v4', () => {
    const method = methods['utils.uuid.v4'];
    const checkResponse = schemaService.compile(
      method.responseDefinition.schema,
    );
    it('should create one by default', async () => {
      const response = await method.handle({});
      expect(response).to.not.be.null;
      expect(response.length).to.equal(1);
      expect(response[0]).to.be.a('string');
      checkResponse(response);
      expect(checkResponse.errors).to.be.null;
    });
    it('should create one', async () => {
      const response = await method.handle({ count: 1 });
      expect(response.length).to.equal(1);
      checkResponse(response);
      expect(checkResponse.errors).to.be.null;
    });
    it('should create multiple', async () => {
      const response = await method.handle({ count: 10 });
      expect(response.length).to.equal(10);
      checkResponse(response);
      expect(checkResponse.errors).to.be.null;
    });
  });
});
