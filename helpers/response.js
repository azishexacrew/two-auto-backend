const successResponse = (ctx, data) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    data
  };
};

const errorResponse = (ctx, errors) => {
  ctx.status = 400;

  if (Array.isArray(errors)) {
    ctx.body = {
      success: false,
      data: null,
      errors
    };
  } else {
    ctx.body = {
      success: false,
      data: null,
      errors: [
        {
          message: errors
        }
      ]
    };
  }
};

const failResponse = (ctx, errors) => {
  ctx.status = 500;
  if (Array.isArray(errors)) {
    ctx.body = {
      success: false,
      data: null,
      errors
    };
  } else {
    ctx.body = {
      success: false,
      data: null,
      errors: [
        {
          message: errors
        }
      ]
    };
  }
};

module.exports = {
  successResponse,
  errorResponse,
  failResponse
};
