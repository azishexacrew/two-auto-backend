const Router = require('koa-router');
const ProvincesController = require("../controllers/provinces");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
    passError: true
});
const provincesRouter = new Router({
    prefix: '/provinces'
});

const provincesSchema = {
    name: Joi.string().allow(""),
    country_id: Joi.number().allow("")
}


provincesRouter.get('/', ProvincesController.listProvinces);

provincesRouter.get('/:id', ProvincesController.findProvinces);

provincesRouter.post('/', validator.body(provincesSchema), ProvincesController.addProvinces);

provincesRouter.put('/:id', validator.body(provincesSchema), ProvincesController.updateProvinces);

provincesRouter.del('/:id', ProvincesController.deleteProvinces);

module.exports = provincesRouter;