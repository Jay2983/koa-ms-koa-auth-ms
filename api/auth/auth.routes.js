'use strict';

const controller = require('./auth.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/auth`,
  });

  router.post('/register', controller.doRegister);
  router.post('/login', controller.doLogin);

  return router;
};
