const mainValidator = require('../../main');
const userValidatorOptions = require('../../options/index').USER;

module.exports = {
  regular(req, res, next) {
    req.assert('email', 'Valid email address should be provided').notEmpty().isEmail().isLength(userValidatorOptions.email);
    req.assert('phone.value', 'Valid phone number should be provided').optional().isNumeric().isLength(userValidatorOptions.phone.value);
    req.assert('phone.is_pubic', 'Valid phone is_public options should be provided').optional().isBoolean();
    req.assert('first_name', 'Valid first name should be provided').notEmpty().isLength(userValidatorOptions.first_name);
    req.assert('last_name', 'Valid last name should be provided').notEmpty().isLength(userValidatorOptions.last_name);
    req.assert('password', 'Valid password should be provided (String, length min6)').notEmpty().isLength(userValidatorOptions.password);
    req.assert('confirm_password', 'Valid confirm password should be provided').notEmpty().isLength(userValidatorOptions.confirm_password);
    req.assert('confirm_password', 'Confirm password does not match Password').optional().equals(req.body.password);
    mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
  },
};
