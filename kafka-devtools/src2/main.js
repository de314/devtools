// Node.js require:
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const jrpcReqSchema = require('./schemas/jsonrpc-request.json');

const data = {
  jsonrpc: '2.0',
  method: 'kafka.consume.poll',
  params: 'string',
  id: 'asdf-123',
};

const validate = ajv.compile(jrpcReqSchema);
const valid = validate(data);

console.log({ valid });
console.log({ error: validate.errors });
