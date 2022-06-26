const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  const salt = await bcrypt.genSaltSync();
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      name: 'vamshree admin',
      email: 'vamshree@bluesquaretech.com.au',
      password: bcrypt.hashSync('siramdasu', salt),
      position: 'Admin',
      is_admin: true,
    },
    {
      name: 'vamshree siramdasu',
      email: 'vamshree@outlook.com',
      password: bcrypt.hashSync('siramdasu', salt),
      position: 'Vice-President',
    },
  ]);
};
