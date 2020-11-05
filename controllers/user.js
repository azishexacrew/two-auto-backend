const UserRepo = require("../repositories/user");
const response = require("../helpers/response");

const listUser = async ctx => {
  try {
    let users = await UserRepo.list();
    response.successResponse(ctx, users);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const createUser = async ctx => {
  try {
    let userData = ctx.request.body;
    let user = await UserRepo.add(userData);
    response.successResponse(ctx, user);
  } catch (error) {
    response.errorResponse(ctx, error.message);
  }
};

const getOneUser = async ctx => {
  try {
    let id = ctx.params.id;
    let user = await UserRepo.findById(id);
    response.successResponse(ctx, user);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const updateUser = async ctx => {
  try {
    let id = ctx.params.id;
    let userData = ctx.request.body;
    let user = await UserRepo.update(id, userData);
    response.successResponse(ctx, user);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const deleteUser = async ctx => {
  try {
    let id = ctx.params.id;
    await UserRepo.deleted(id);
    response.successResponse(ctx, "User deleted");
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

module.exports = {
  listUser,
  createUser,
  getOneUser,
  updateUser,
  deleteUser
}