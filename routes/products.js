const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const ProductsController = require("../controllers/products");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const productsRouter = new Router({ prefix: '/products' });

const productsSchema = {
  name: Joi.string().allow(""),
  icon: Joi.string().allow(""),
  active: Joi.boolean().allow(""),
}

productsRouter.use(authMiddleware.verifyToken);
productsRouter.use(authMiddleware.authenticate);

productsRouter.get('/', ProductsController.listProducts);

productsRouter.get('/vendor', ProductsController.listProducts);

productsRouter.get('/:id',ProductsController.findProducts);

productsRouter.post('/', validator.body(productsSchema), ProductsController.addProducts);

productsRouter.put('/:id', validator.body(productsSchema), ProductsController.updateProducts);

productsRouter.del('/:id', ProductsController.deleteProducts);

module.exports = productsRouter;