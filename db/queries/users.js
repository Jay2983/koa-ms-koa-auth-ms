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

// user for integration tests
function getFirstUserId() {
  return knex('users')
    .select('id')
    .first();
}
function updateOne(userId, user) {
  return knex('users')
    .where('id', userId)
    .update(user)
    .returning('*');
}

function getOneUserByEmail(email) {
  return knex('users')
    .select('*')
    .where('email', email);
}

module.exports = {
  getAllUsers,
  getOneUser,
  createOne,
  getFirstUserId,
  updateOne,
  getOneUserByEmail,
};
