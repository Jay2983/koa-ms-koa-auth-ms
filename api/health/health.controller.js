const successStatus = {
  status: 'success',
};

exports.getStatus = async ctx => {
  ctx.status = 200;
  ctx.body = successStatus;
};
