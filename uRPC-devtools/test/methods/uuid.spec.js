const expect = require('chai').expect;
const uuidHandlers = require('../../src/methods/uuid');
const { schemaService } = require('../../src/SchemaService.js');

const methods = {};
uuidHandlers.forEach(method => (methods[method.key] = method));

describe('RPC => Utils => UUID Namespace', () => {
  describe('utils.uuid.v1', () => {
    const method = methods['utils.uuid.v1'];
    const compiled = schemaService.compile(method.responseDefinition.schema);
    const checkResponse = response => {
      const result = compiled.validate(response);
      expect(result.errors).to.be.undefined;
      expect(result.valid).to.be.true;
    };
    it('should create one by default', async () => {
      const response = await method.handle({});
      expect(response).to.not.be.null;
      expect(response.length).to.equal(1);
      expect(response[0]).to.be.a('string');
      checkResponse(response);
    });
    it('should create one', async () => {
      const response = await method.handle({ count: 1 });
      expect(response.length).to.equal(1);
      checkResponse(response);
    });
    it('should create multiple', async () => {
      const response = await method.handle({ count: 10 });
      expect(response.length).to.equal(10);
      checkResponse(response);
    });
  });
  describe('utils.uuid.v4', () => {
    const method = methods['utils.uuid.v4'];
    const compiled = schemaService.compile(method.responseDefinition.schema);
    const checkResponse = response => {
      const result = compiled.validate(response);
      expect(result.valid).to.be.true;
      expect(result.errors).to.be.undefined;
    };
    it('should create one by default', async () => {
      const response = await method.handle({});
      expect(response).to.not.be.null;
      expect(response.length).to.equal(1);
      expect(response[0]).to.be.a('string');
      checkResponse(response);
    });
    it('should create one', async () => {
      const response = await method.handle({ count: 1 });
      expect(response.length).to.equal(1);
      checkResponse(response);
    });
    it('should create multiple', async () => {
      const response = await method.handle({ count: 10 });
      expect(response.length).to.equal(10);
      checkResponse(response);
    });
  });
});
