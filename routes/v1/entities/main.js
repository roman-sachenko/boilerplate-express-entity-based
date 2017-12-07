'use strict';

const controller = require(`${basePath}/app/controllers/main`);

module.exports = (router) => {
  router.get('/', controller.main);
  router.get('/status/', controller.status);
};