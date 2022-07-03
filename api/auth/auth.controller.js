const queries = require('../../db/queries/users');
const passport = require('koa-passport');
require('../../auth');

exports.doRegister = async ctx => {
  try {
    const savedUser = await queries.createOne(ctx.request.body);
    if (!savedUser) {
      ctx.throw(400, 'Registration Unsuccessful');
    } else {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
      };
    }
  } catch (err) {
    ctx.throw(400, err);
  }
};

exports.doLogin = async ctx => {
  return passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      ctx.throw(400, 'Login Unsuccessful');
    } else {
      ctx.body = {
        status: 'success',
        user,
      };
    }
  })(ctx);
};
