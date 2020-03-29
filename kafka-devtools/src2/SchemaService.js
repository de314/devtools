const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

class SchemaService {
  compile(schema) {
    return ajv.compile(schema);
  }
  validate(schema, data) {
    return this.compile(schema)(data);
  }
}

SchemaService.schemaService = new SchemaService();

module.exports = SchemaService;
