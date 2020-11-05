const Router = require('koa-router');
const FacilitiesController = require("../controllers/facilities");
const Joi = require('joi');
const joiValidate = require('koa2-joi-validate');
const validator = joiValidate({
  passError: true
});
const authMiddleware = require('../middleware/auth');
const facilitiesRouter = new Router({ prefix: '/facilities' });

const facilitiesAddSchema = {
    name: Joi.string().allow(""),
    workshop_id: Joi.number().allow(""),
  };

facilitiesRouter.use(authMiddleware.verifyToken);
facilitiesRouter.use(authMiddleware.authenticate);



facilitiesRouter.get('/', FacilitiesController.listFacilities);

facilitiesRouter.get('/:id', FacilitiesController.findFacilities);

facilitiesRouter.post('/', validator.body(facilitiesAddSchema), FacilitiesController.addFacilities);

facilitiesRouter.put('/:id', validator.body(facilitiesAddSchema), FacilitiesController.updateFacilities);

facilitiesRouter.del('/:id', FacilitiesController.deleteFacilities);

module.exports = facilitiesRouter;