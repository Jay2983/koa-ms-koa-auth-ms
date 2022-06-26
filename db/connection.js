const environment = require('../config').env || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

module.exports = knex;
