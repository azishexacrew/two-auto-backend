const PartnerRepo = require("../repositories/partner");
const UserRepo = require("../repositories/user");
const AdminRepo = require("../repositories/admin");
const response = require("../helpers/response");

const registerPartner = async ctx => {
  try {
    let { email, password } = ctx.request.body;
    let partner = await PartnerRepo.register(email, password);
    response.successResponse(ctx, partner);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const loginPartner = async ctx => {
  try {
    let { email, password } = ctx.request.body;
    let partner = await PartnerRepo.login(email, password);
    response.successResponse(ctx, partner);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const registerUser = async ctx => {
  try {
    let { email, password } = ctx.request.body;
    let user = await UserRepo.register(email, password);
    response.successResponse(ctx, user);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const loginUser = async ctx => {
  try {
    let { email, password } = ctx.request.body;
    let user = await UserRepo.login(email, password);
    response.successResponse(ctx, user);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const loginAdmin = async ctx => {
  try {
    let { email, password } = ctx.request.body;
    let admin = await AdminRepo.login(email, password);
    response.successResponse(ctx, admin);
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const forgotPassword = async ctx => {
  try {
    let { email } = ctx.request.body;
    let user = await UserRepo.findByEmail(email);
    
    if(!user) {
      return response.errorResponse(ctx, "user not found");
    }

    UserRepo.sendResetPassword(email);
    response.successResponse(ctx, "email sent");
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

const resetPassword = async ctx => {
  try {
    let { code, newPassword } = ctx.request.body;
    let payload = await UserRepo.findResetPasswordCode(code);

    if(!payload) {
      return response.errorResponse(ctx, {
        code: "INVALID_OR_EXPIRED_CODE",
        message: "invalid or expired code"
      });
    }

    let user = await UserRepo.findByPk(payload.id);

    if(!user) {
      return response.errorResponse(ctx, {
        code: "USER_NOT_FOUND",
        message: "user not found"
      });
    }
    
    await UserRepo.resetPassword(user, newPassword, code);
    response.successResponse(ctx, "password updated");
  } catch (error) {
    response.errorResponse(ctx, error);
  }
};

module.exports = {
  registerPartner,
  loginPartner,
  registerUser,
  loginUser,
  loginAdmin,
  forgotPassword,
  resetPassword
};
