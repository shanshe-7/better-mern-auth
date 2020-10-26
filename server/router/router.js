const Authentication = require('../controllers/authentication');
const passport = require('passport');
const passportService = require('../services/passport');
const { validateBody, schemas } = require('../helper/routeHelpers');

const passportAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.post(
    '/signup',
    validateBody(schemas.signUpSchema),
    Authentication.signUp
  );
  app.post(
    '/signin',
    validateBody(schemas.signInSchema),
    requireSignin,
    Authentication.signIn
  );
  app.get('/secret', passportAuth, Authentication.secret);
};
