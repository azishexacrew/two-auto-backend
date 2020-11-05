const Router = require('koa-router');
const CitiesController = require("../controllers/cities");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
    passError: true
});
const citiesRouter = new Router({
    prefix: '/cities'
});

const citiesSchema = {
    name: Joi.string().allow(""),
    province_id: Joi.number().allow("")
}

citiesRouter.get('/', CitiesController.listCities);

citiesRouter.get('/:id', CitiesController.findCities);

citiesRouter.post('/', validator.body(citiesSchema), CitiesController.addCities);

citiesRouter.put('/:id', validator.body(citiesSchema), CitiesController.updateCities);

citiesRouter.del('/:id', CitiesController.deleteCities);

module.exports = citiesRouter;