const knex = require('../connection');

function getAllUsers() {
  return knex('users').select('*');
}

module.exports = {
  getAllUsers,
};
