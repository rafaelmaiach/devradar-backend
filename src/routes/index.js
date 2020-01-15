const { Router } = require('express');

const devs = require('./devs');
const search = require('./search');

const router = Router();

devs(router);
search(router);

module.exports = router;
