const query = require('../../db/queries/users.js');

exports.getOne = async ctx => {
  const { userId } = ctx.params;
  const user = await query.getOneUser(userId);
  ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: user,
  };
};

exports.getAll = async ctx => {
  try {
    const users = await query.getAllUsers();
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: users,
    };
  } catch (err) {
    ctx.throw(400, err);
  }
};

exports.createOne = async ctx => {
  try {
    const savedUser = await query.createOne(ctx.request.body);
    if (!savedUser) {
      ctx.throw(400, 'User could not be created');
    } else {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: savedUser,
      };
    }
  } catch (err) {
    ctx.throw(400, err);
  }
};

exports.updateOne = async ctx => {
  try {
    const { userId } = ctx.params;
    const updatedUser = await query.updateOne(userId, ctx.request.body);
    if (!updatedUser) {
      ctx.throw(400, 'User could not be updated');
    } else {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: updatedUser,
      };
    }
  } catch (err) {
    ctx.throw(400, err);
  }
};
