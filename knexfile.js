const path = require('path');

const BASE_PATH = path.join(__dirname, 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://dummy:123456@localhost:5432/koa_api_auth_test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://dummy:123456@localhost:5432/koa_api_auth',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
