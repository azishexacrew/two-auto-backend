const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const Workshop_productsController = require("../controllers/workshop_products");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const workshop_productsRouter = new Router({ prefix: '/workshop-products' });

const workshop_productsScema = {
  workshop_id: Joi.number().allow(""),
  products_id: Joi.number().allow(""),
}

workshop_productsRouter.use(authMiddleware.verifyToken);
workshop_productsRouter.use(authMiddleware.authenticate);



workshop_productsRouter.get('/', Workshop_productsController.listWorkshop_products);

workshop_productsRouter.get('/:id', Workshop_productsController.findWorkshop_products);

workshop_productsRouter.post('/', validator.body(workshop_productsScema), Workshop_productsController.addWorkshop_products);

workshop_productsRouter.put('/:id', validator.body(workshop_productsScema), Workshop_productsController.updateWorkshop_products);

workshop_productsRouter.del('/:id', Workshop_productsController.deleteWorkshop_products);

module.exports = workshop_productsRouter;