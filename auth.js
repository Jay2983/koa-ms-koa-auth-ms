const passport = require('koa-passport');
const knex = require('./db/connection');
const LocalStrategy = require('passport-local').Strategy;
const bcrypyUtils = require('./utils/bcrypt.util');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex('users')
    .where({ id })
    .first()
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      return knex('users')
        .where({ email })
        .first()
        .then(user => {
          if (!user) {
            return done(null, false);
          }
          if (!bcrypyUtils.comparePassword(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(err => done(err, null));
    },
  ),
);
