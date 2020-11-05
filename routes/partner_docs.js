const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const Partner_docsController = require("../controllers/partner_docs");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const partner_docsRouter = new Router({ prefix: '/docs' });

partner_docsRouter.use(authMiddleware.verifyToken);
partner_docsRouter.use(authMiddleware.authenticate);

const partner_docsRegisterSchema = {
  doc_type: Joi.string().allow(""),
  doc_file: Joi.string().allow(""),
  npwp_file: Joi.string().allow(""),
  npwp: Joi.string().allow(""),
  partner_id: Joi.number().allow(""),
};

partner_docsRouter.post('/', validator.body(partner_docsRegisterSchema), Partner_docsController.addPartner_docs);

module.exports = partner_docsRouter;