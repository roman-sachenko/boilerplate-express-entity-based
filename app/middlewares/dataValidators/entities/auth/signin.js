const mainValidator = require('../../main');

module.exports = {
  signin(req, res, next) {
    req.assert('email', 'Valid email address should be provided').notEmpty().isEmail();
    req.assert('password', 'Valid password should be provided').notEmpty();
    mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
  },
};
