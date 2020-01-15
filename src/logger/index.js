const path = require('path');
const log4js = require('log4js');

const isProduction = process.env.NODE_ENV === 'production';
const DEFAULT_LEVEL = isProduction ? 'error' : 'debug';
const DEFAULT_FILENAME = isProduction ? 'error.log' : 'debug.log';

const defaultLogger = log4js.getLogger();

// log4js: https://github.com/log4js-node/log4js-node
// docs: https://log4js-node.github.io/log4js-node/index.html

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    file: { type: 'file', filename: path.resolve(__dirname, '..', 'logs', DEFAULT_FILENAME) },
  },
  categories: {
    default: { appenders: ['out', 'file'], level: DEFAULT_LEVEL },
  },
});

module.exports = (category, level = DEFAULT_LEVEL) => {
  if (!category || typeof category !== 'string') {
    return defaultLogger;
  }

  const logger = log4js.getLogger(category);
  logger.level = level;

  return logger;
};
