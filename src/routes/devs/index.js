const DevController = require('../../controllers/DevController');

module.exports = function defineRoutes(router) {
  router.get('/devs', DevController.index);
  router.post('/devs', DevController.store);
};
