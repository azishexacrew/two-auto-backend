const Router = require('koa-router');
const authMiddleware = require('../middleware/auth');
const profileController = require("../controllers/profile");
const profileRouter = new Router({ prefix: '/profile' });

profileRouter.use(authMiddleware.verifyToken);
profileRouter.use(authMiddleware.authenticate);

profileRouter.get('/', async (ctx) => {
    ctx.body = ctx.current_user;        
});

profileRouter.get('/partner-kyc', profileController.findPartnerkyc);

module.exports = profileRouter;
