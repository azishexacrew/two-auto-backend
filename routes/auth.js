const Router = require("koa-router");
const Joi = require("joi");
const joiValidate = require("koa2-joi-validate");

const AuthController = require("../controllers/auth");

const validator = joiValidate({
  passError: true
});

const userRegisterSchema = {
  username: Joi.string().allow(""),
  email: Joi.string().allow(""),
  password: Joi.string()
    .allow("")
    .min(8),
  phone: Joi.string().allow(""),
  fullname: Joi.string().allow(""),
  address: Joi.string().allow(""),
  point: Joi.number()
    .allow("")
    .default(0)
};
const partnerRegisterSchema = {
  name: Joi.string().allow(""),
  phone: Joi.string().allow(""),
  email: Joi.string().required(),
  passport: Joi.string().allow(""),
  address: Joi.string().allow(""),
  password: Joi.string()
    .allow("")
    .min(8),
  longitude: Joi.number().allow(""),
  latitude: Joi.number().allow(""),
  company_name: Joi.string().allow(""),
  company_type: Joi.string().allow("")
};
const loginSchema = {
  email: Joi.string().required(),
  password: Joi.string().required()
};
const forgotPasswordSchema = {
  email: Joi.string().required()
};
const resetPasswordSchema = {
  newPassword: Joi.string().required(),
  code: Joi.string().required()
};

const authRouter = new Router();

authRouter.get("/", async ctx => {
  ctx.body = { message: "Welcome to 2auto", who: "You" };
});

authRouter.post(
  "/register-partner",
  validator.body(partnerRegisterSchema),
  AuthController.registerPartner
);
authRouter.post(
  "/login-partner",
  validator.body(loginSchema),
  AuthController.loginPartner
);

authRouter.post(
  "/register",
  validator.body(userRegisterSchema),
  AuthController.registerUser
);
authRouter.post(
  "/login",
  validator.body(loginSchema),
  AuthController.loginUser
);

authRouter.post(
  "/login-admin",
  validator.body(loginSchema),
  AuthController.loginAdmin
);
authRouter.post(
  "/forgot-password",
  validator.body(forgotPasswordSchema),
  AuthController.forgotPassword
);
authRouter.put(
  "/forgot-password",
  validator.body(resetPasswordSchema),
  AuthController.resetPassword
);

module.exports = authRouter;
