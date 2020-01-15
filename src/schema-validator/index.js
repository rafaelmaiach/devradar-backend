const Ajv = require('ajv');

const getValidator = (schema, ajv) => {
  /**
   * Validate any data based on the schema name sent
   * @param {string} schemaName schema name to validate data against
   * @param {any} data data to be validated
   */
  const validator = (schemaName, data) => {
    if (!schema[schemaName]) {
      throw new Error(`Schema ${schemaName} does not exist.`);
    }

    const valid = ajv.validate(schema[schemaName], data);

    return {
      isValid: valid,
      errors: valid ? null : ajv.errors,
    };
  };

  validator.SCHEMA = {
    ...schema,
  };

  return validator;
};

/**
 * return a validator function based on the schemas passed. Schemas must be an object
 * where each key is the schema name and it's value the object representing an ajv schema
 * @param {object} schemas An object where each key is a schema name which will be used to access the ajv schema related to it
 * @example { variableNameToValidate: { type: 'string', 'minlength': 50 } }
 * @return {function} validator function
 */
module.exports = (schemas) => {
  const ajv = new Ajv({ allErrors: true });
  const schema = {};

  if (schemas && typeof schemas === 'object') {
    // eslint-disable-next-line
    for (const key in schemas) {
      ajv.addSchema(schemas[key], key);
      schema[key] = key;
    }
  } else {
    throw new Error('Schemas is not an object');
  }

  return getValidator(schema, ajv);
};
