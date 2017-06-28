'use strict';

/**
 * Application Extensions
 */

module.exports = {
  AuthTimeout: function(errorMessage) {
    this.status = 419;
    this.message = errorMessage || 'authentication timeout';
  },

  ServiceInitializationError: function(errorMessage){
    this.status = 500;
    this.message = errorMessage || 'service initialization error';
  },

  UnknownError: function(errorMessage, data){
    this.status = 500;
    this.message = errorMessage || 'Oops, something went wrong';
    this.data    = data;
  },

  NotFound: function(errorMessage){
    this.status = 404;
    this.message = errorMessage || 'not found';
  },

  NotAuthorized: function(errorMessage){
    this.status = 401;
    this.message = errorMessage || 'not authorized';
  },

  Forbidden: function(errorMessage){
    this.status = 403;
    this.message = errorMessage || 'access forbidden';
  },

  BadRequest: function(errorMessage){
    this.status = 400;
    this.message = errorMessage || 'input data is not valid';
  },

  AlreadyExist: function(errorMessage) {
    this.status = 409;
    this.message = errorMessage || 'already exist';
  },

  CustomError: function(errorCode, errorMessage, data) {
    this.status     = errorCode || 500;
    this.message    = errorMessage || 'Oops, something went wrong';
    this.data       = data;
  }
};