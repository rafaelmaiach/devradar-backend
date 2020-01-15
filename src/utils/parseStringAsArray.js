module.exports = function parseStringAsArray(stringToBeParsed) {
  return stringToBeParsed.split(',').map(tech => tech.trim());
};
