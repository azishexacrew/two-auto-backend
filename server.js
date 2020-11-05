const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const debug = require("debug")("2auto-api:server");
const http = require("http");
const Koa = require("koa");
const json = require("koa-json");

const authMiddleware = require("./middleware/auth");
const config = require("./config");
const uploadRouter = require("./routes/upload");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const partnerRouter = require("./routes/partner");
const partner_bankRouter = require("./routes/partner_bank");
const partner_docsRouter = require("./routes/partner_docs");
const partner_workshopRouter = require("./routes/partner_workshop");
// const outletRouter = require('./routes/outlet');
// const consultationRouter = require('./routes/consultation');
const facilitiesRouter = require("./routes/facilities");
const productsRouter = require("./routes/products");
const workshop_productsRouter = require("./routes/workshop_products");
// const vehicleRouter = require('./routes/vehicle');
// const paymentRouter = require('./routes/payment');
// const ratingRouter = require('./routes/rating');
// const companyRouter = require('./routes/company');
// const serviceRouter = require('./routes/service');
const countriesRouter = require("./routes/countries");
const provincesRouter = require("./routes/provinces");
const citiesRouter = require("./routes/cities");
const profileRouter = require("./routes/profile");

const errorReport = require('./helpers/error');

const response = require("./helpers/response");

const app = new Koa();
const server = http.createServer(app.callback());

errorReport.setupErrorReport();

app.use(bodyParser({}));
app.use(json());
app.use(cors());
app.use(authMiddleware.initialize);

app.use(errorMiddleware);

/* Taruh router yang tidak memerlukan token disini */
app.use(authRouter.routes());
app.use(uploadRouter.routes());

/* Taruh router yang memerlukan token disini */
app.use(partnerRouter.routes());
app.use(partner_bankRouter.routes());
app.use(partner_docsRouter.routes());
app.use(partner_workshopRouter.routes());
app.use(workshop_productsRouter.routes());
app.use(productsRouter.routes());
app.use(userRouter.routes());
app.use(facilitiesRouter.routes());
app.use(countriesRouter.routes());
app.use(provincesRouter.routes());
app.use(citiesRouter.routes());
app.use(profileRouter.routes());

async function errorMiddleware(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) {
      throw Error("Not Found");
    }
  } catch (err) {
    if (err.message && err.message.isJoi) {
      response.errorResponse(ctx, err.message.details);
    } else {
      response.failResponse(ctx, err.message);
    }
  }
}

server.listen(config.port, function() {
  const { port } = server.address();
  debug(`Listening on port ${port}`);
});
