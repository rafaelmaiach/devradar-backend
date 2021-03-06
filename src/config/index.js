require('dotenv').config();
const logger = require('../logger')('Config');
const validator = require('../schema-validator');
const schemas = require('./config.schema.json');

const validate = validator(schemas);

const env = {
  ...process.env,
};

const isEnvValid = validate('ENV', env);

if (!isEnvValid.isValid) {
  logger.fatal('Invalid/insufficient ENV variables');
  logger.fatal(JSON.stringify(isEnvValid.errors));
  process.exit(1);
}

const config = {
  env: env.NODE_ENV,
  port: env.PORT || 3333,
  isProduction: env.NODE_ENV === 'production',
  database: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
  },
  certPass: env.CERT_PASS,
  sslEnabled: env.SSL_ENABLED === 'true',
};

module.exports = Object.freeze(config);
