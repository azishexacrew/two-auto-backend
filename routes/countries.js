const Router = require('koa-router');
const CountriesController = require("../controllers/countries");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
    passError: true
});
const countriesRouter = new Router({ prefix: '/countries' });

const countriesSchema = {
    name: Joi.string().allow(""),
}

countriesRouter.get('/',CountriesController.listCountries);

countriesRouter.get('/:id', CountriesController.findCountries);

countriesRouter.post('/', validator.body(countriesSchema), CountriesController.addCountries);

countriesRouter.put('/:id', validator.body(countriesSchema), CountriesController.updateCountries);

countriesRouter.del('/:id', CountriesController.deleteCountries);

module.exports = countriesRouter;