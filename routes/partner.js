const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const PartnerController = require("../controllers/partner");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const partnerRouter = new Router({
  prefix: '/partner'
});

const partnerRegisterSchema = {
  name: Joi.string().allow(""),
  phone: Joi.string().allow(""),
  email: Joi.string().allow(""),
  passport: Joi.string().allow(""),
  address: Joi.string().allow(""),
  password: Joi.string().min(8),
  longitude: Joi.number().allow(""),
  latitude: Joi.number().allow(""),
  company_name: Joi.string().allow(""),
  company_type: Joi.string().allow(""),
  city_id: Joi.number().allow(""),
};

const partnerPutSchema = {
  name: Joi.string().allow(""),
  phone: Joi.string().allow(""),
  email: Joi.string().allow(""),
  passport: Joi.string().allow(""),
  address: Joi.string().allow(""),
  longitude: Joi.number().allow(""),
  latitude: Joi.number().allow(""),
  company_name: Joi.string().allow(""),
  company_type: Joi.string().allow(""),
  city_id: Joi.number().allow(""),
};

const partnerPasswordSchema = {
  password: Joi.string().min(8)
}

const partnerKycSchema = {
  email: Joi.string()
}

const changePasswordSchema = {
  code: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
};

const resetPasswordSchema = {
  email: Joi.string().required(),
};

partnerRouter.post('/reset', validator.body(resetPasswordSchema), PartnerController.resetPasswordPartner);

partnerRouter.post('/forgot-password', validator.body(resetPasswordSchema), PartnerController.sendEmailPasswordPartner);

partnerRouter.put('/forgot-password', validator.body(changePasswordSchema), PartnerController.updateForgotPasswordPartner);

partnerRouter.use(authMiddleware.verifyToken);
partnerRouter.use(authMiddleware.authenticate);

partnerRouter.get('/', PartnerController.listPartner);

partnerRouter.put('/complete-kyc', PartnerController.completKyc);

partnerRouter.get('/:id', PartnerController.findPartner);

partnerRouter.post('/', validator.body(partnerRegisterSchema), PartnerController.addPartner);

partnerRouter.put('/:id', validator.body(partnerPutSchema), PartnerController.updatePartner);

partnerRouter.put('/password/:id', validator.body(partnerPasswordSchema), PartnerController.updatePasswordPartner);

partnerRouter.del('/:id', PartnerController.deletePartner);

module.exports = partnerRouter;