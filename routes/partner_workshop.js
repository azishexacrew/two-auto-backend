const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const Partner_workshopController = require("../controllers/partner_workshop");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const partner_workshopRouter = new Router({
  prefix: '/workshop'
});

const partner_workshopSchema = {
  name: Joi.string().allow(""),
  category: Joi.string().allow(""),
  phone: Joi.string().allow(""),
  email: Joi.string().allow(""),
  openAt: Joi.string().allow(""),
  closeAt: Joi.string().allow(""),
  day_pattern: Joi.string().allow(""),
  longitude: Joi.number().allow(""),
  latitude: Joi.number().allow(""),
  image_url: Joi.string().allow(""),
  address: Joi.string().allow(""),
  rating: Joi.number().allow(""),
  city_id: Joi.number().allow(""),
  partner_id: Joi.number().allow(""),
};

const nearestWorkshopSchema = {
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  radius: Joi.number().allow(""),
}

const workshop_productsSchema = {
  products_id: Joi.array(),
  workshop_id: Joi.number(),
}

partner_workshopRouter.post('/nearest', validator.body(nearestWorkshopSchema), Partner_workshopController.findNearestWorkshop);

partner_workshopRouter.get('/:id/open', Partner_workshopController.findOpenWorkshop);

partner_workshopRouter.use(authMiddleware.verifyToken);
partner_workshopRouter.use(authMiddleware.authenticate);

partner_workshopRouter.get('/', Partner_workshopController.listPartner_workshop);

partner_workshopRouter.get('/:id', Partner_workshopController.findPartner_workshop);

partner_workshopRouter.post('/', validator.body(partner_workshopSchema), Partner_workshopController.addPartner_workshop);

partner_workshopRouter.post('/products', validator.body(workshop_productsSchema), Partner_workshopController.addWorkshop_products);

partner_workshopRouter.put('/products/:id', validator.body(workshop_productsSchema), Partner_workshopController.updateWorkshop_products);

partner_workshopRouter.put('/:id', validator.body(partner_workshopSchema), Partner_workshopController.updatePartner_workshop);

partner_workshopRouter.del('/:id', Partner_workshopController.deletePartner_workshop);

module.exports = partner_workshopRouter;