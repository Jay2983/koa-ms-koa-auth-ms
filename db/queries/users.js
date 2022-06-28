const knex = require('../connection');

function getAllUsers() {
  return knex('users').select('*');
}

function getOneUser(userId) {
  return knex('users')
    .select('*')
    .where('id', userId);
}

function createOne(user) {
  return knex('users')
    .insert(user)
    .returning('*');
}

module.exports = {
  getAllUsers,
  getOneUser,
  createOne,
};
