const expect = require('chai').expect;
const { schemaService } = require('../src/SchemaService.js');

describe('SchemaService', () => {
  it('should validate valid data', () => {
    const schema = { type: 'string' };
    const data = 'Hello, World!';
    const result = schemaService.validate(schema, data);
    expect(result).to.be.an('object');
    expect(result.valid).to.be.true;
    expect(result.errors).to.be.undefined;
  });
  it('should not validate invalid data', () => {
    const schema = { type: 'string' };
    const data = 42;
    const result = schemaService.validate(schema, data);
    expect(result).to.be.an('object');
    expect(result.valid).to.be.false;
    expect(Object.keys(result.errors).length).to.eq(1);
    expect(result.errors['0'].message).to.eq('should be string');
  });
  it('should compile schema', () => {
    const schema = { type: 'string', pattern: '^Hello, \\w+!$' };
    const compiled = schemaService.compile(schema);
    expect(compiled).to.be.an('object');
    expect(compiled.validate).to.be.a('function');
  });
  it('should handle multiple executions', () => {
    const schema = { type: 'string', pattern: '^Hello, \\w+!$' };
    const data1 = 42;
    const data2 = 'Hello, not valid :(';
    const data3 = 'Hello, World!';
    const compiled = schemaService.compile(schema);
    let result = compiled.validate(data1);
    expect(result).to.be.an('object');
    expect(result.valid).to.be.false;
    expect(Object.keys(result.errors).length).to.eq(1);
    expect(result.errors['0'].message).to.eq('should be string');

    result = compiled.validate(data2);
    expect(result).to.be.an('object');
    expect(result.valid).to.be.false;
    expect(Object.keys(result.errors).length).to.eq(1);
    expect(result.errors['0'].message).to.match(/^should match pattern.*$/);

    result = compiled.validate(data3);
    expect(result).to.be.an('object');
    expect(result.valid).to.be.true;
  });
});
