const passport = require('koa-passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Partner = require('../models/partner');
const Admin = require('../models/admin');
const response = require('../helpers/response');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'two-auto',
};

passport.use(new JwtStrategy(options, async function(payload, done) {
  if (!payload.email) {
    done(Error('Invalid Token'));
  } else {
    let user = null;
    console.log('payload', payload);
    if (payload.role && payload.role === 'partner') {
      user = await Partner.findOne({ where: { email: payload.email } });
    } else if(payload.role && payload.role === 'admin') {
      user = await Admin.findOne({ where: { email: payload.email } });
    } else {
      user = await User.findOne({ where: { email: payload.email } });
    }
    if (!user) {
      done(Error('User Not Found'));
    } else {
      done(null, user);
    }
  }
}));

const initialize = passport.initialize();
const authenticate = passport.authenticate('jwt', { session: false });
const verifyToken = async function (ctx, next) {
  const auth = ctx.request.get('Authorization');
  if (!auth) {
    response.errorResponse(ctx, {
      code: 'NO_TOKEN',
      message: 'No Token Detected'
    });
  } else {
    const token = auth.split(' ')[1];
    try {
      let payload = jwt.verify(token, 'two-auto');
      if (payload.role && payload.role === 'partner') {
        ctx.current_user = await Partner.findOne({ where: { email: payload.email } });
      } else if(payload.role && payload.role === 'admin') {
        ctx.current_user = await Admin.findOne({ where: { email: payload.email } });
      } else {
        ctx.current_user = await User.findOne({ where: { email: payload.email } });
      }
      // if verified will continue add current user to the context
      await next();
    } catch(err) {
      response.failResponse(ctx, {
        code: err.code,
        message: err.message
      });
    }
  }
}

module.exports = {
  initialize,
  verifyToken,
  authenticate,
};
