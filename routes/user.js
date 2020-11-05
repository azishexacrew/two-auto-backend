const Router = require("koa-router");
const Joi = require("joi");
const joiValidate = require("koa2-joi-validate");
const authMiddleware = require('../middleware/auth');
const userRouter = new Router({ prefix: "/user" });

const userController = require("../controllers/user");

const validator = joiValidate({
  passError: true
});

const userSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string(),
  phone: Joi.string(),
  fullname: Joi.string(),
  point: Joi.number(),
  address: Joi.string(),
}

userRouter.use(authMiddleware.verifyToken);
userRouter.use(authMiddleware.authenticate);

userRouter.get("/", userController.listUser);

userRouter.post(
  "/",
  validator.body(userSchema),
  userController.createUser
);

userRouter.get(
  "/:id", 
  validator.params({id: Joi.number().required()}), 
  userController.getOneUser
);

userRouter.put(
  "/:id", 
  validator.params({id: Joi.number().required()}), 
  validator.body(userSchema), 
  userController.updateUser
);

userRouter.del(
  "/:id", 
  validator.params({id: Joi.number().required()}), 
  userController.deleteUser
);

module.exports = userRouter;
