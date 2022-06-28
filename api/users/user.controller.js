const generateId = require('../../utils/generateId.util');
const query = require('../../db/queries/users.js');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  users: [
    {
      id: 'bff28903-042e-47c2-b9ee-07c3954989ec',
      name: 'Marco',
      created_at: 1558536830937,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Leonardo',
      created_at: 1558536843742,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Berta',
      created_at: 1558536863550,
    },
  ],
};

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
