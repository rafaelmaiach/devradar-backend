const SearchController = require('../../controllers/SearchController');

module.exports = function defineRoutes(router) {
  router.get('/search', SearchController.index);
};
