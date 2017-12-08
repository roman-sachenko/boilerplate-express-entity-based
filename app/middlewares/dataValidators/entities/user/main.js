'use strict';


const mainValidator           = require('../../main');
const userValidatorOptions    = require('../../options/index').USER;
const { check }               = require('express-validator/check');


module.exports = {
  createOne: (req, res, next) => {

  },

  updateOne: [
      check('userId').exists().isMongoId().withMessage('Valid user id should be provided'),
      check('email').optional().isEmail().isLength(userValidatorOptions.email).withMessage('Valid email address should be provided'),
      check('phone.value').optional().isNumeric().isLength(userValidatorOptions.phone.value).withMessage('Valid phone number should be provided'),
      check('phone.is_pubic').optional().isBoolean().withMessage('Valid phone is_public options should be provided'),
      check('first_name').optional().isLength(userValidatorOptions.first_name).withMessage('Valid first name should be provided'),
      check('last_name').optional().isLength(userValidatorOptions.last_name).withMessage('Valid last name should be provided'),
      check('password').optional().isLength(userValidatorOptions.password).withMessage('Valid password should be provided (String, length min: 6)'),
      check('confirm_password').optional().isLength(userValidatorOptions.confirm_password).withMessage('Valid confirm password should be provided'),

      (req, res, next) => {
        req.assert('confirm_password', 'Confirm password does not match Password').optional().equals(req.body.password);
        mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
      }
    ],


  getOne: (req, res, next) => {
    req.assert('userId', 'Valid user id should be provided').notEmpty().isMongoId();
    mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
  },

  getAll: (req, res, next) => {
    next();
  },

  deleteOne: (req, res, next) => {
    req.assert('userId', 'Valid user id should be provided').notEmpty().isMongoId();
    mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
  },

  deleteMultiple: (req, res, next) => {

  }
};
