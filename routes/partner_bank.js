const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const Partner_bankController = require("../controllers/partner_bank");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const partner_bankRouter = new Router({
  prefix: '/bank'
});

partner_bankRouter.use(authMiddleware.verifyToken);
partner_bankRouter.use(authMiddleware.authenticate);

const partner_bankRegisterSchema = {
  bank_name: Joi.string().allow(""),
  account_number: Joi.string().allow(""),
  account_name: Joi.string().allow(""),
  document_file: Joi.string().allow(""),
  partner_id: Joi.number().allow(""),
};

partner_bankRouter.post('/', validator.body(partner_bankRegisterSchema), Partner_bankController.addPartner_bank);

module.exports = partner_bankRouter;