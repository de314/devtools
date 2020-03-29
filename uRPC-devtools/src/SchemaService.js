const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

class SchemaService {
  compile(schema) {
    const compiled = ajv.compile(schema);
    return {
      validate: data =>
        compiled(data)
          ? { valid: true }
          : { valid: false, errors: { ...compiled.errors } },
    };
  }
  validate(schema, data) {
    return this.compile(schema).validate(data);
  }
}

SchemaService.schemaService = new SchemaService();

module.exports = SchemaService;
