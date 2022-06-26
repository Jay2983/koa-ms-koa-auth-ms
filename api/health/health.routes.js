'use strict';

const controller = require('./health.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/health`,
  });

  router.get('/', controller.getStatus);

  return router;
};
