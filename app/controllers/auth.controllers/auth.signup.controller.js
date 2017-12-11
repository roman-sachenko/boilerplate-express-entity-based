'use strict';

const { UserService, DbService, ResponseService } = require(`${basePath}/app/services`);

const helpers           = require(`${basePath}/app/helpers`);
const { AlreadyExist }  = require(`${basePath}/app/utils/apiErrors`);
const UserModel         = DbService.models().User;


module.exports = {
  /**
   * Regular Sing Up Process using manually provided details
   * @param req
   * @param res
   * @param next
   */
  regular: (req, res, next) => {
    let signUpData = req.entities.mapped.signUpData;
    
    UserModel
      .findOne({ email: signUpData.email })
      .select('_id')
      .then((searchResult) => {
        if(!helpers.isObjectValid(searchResult)) {
          let userService = new UserService(signUpData);
          return userService.create(signUpData);
        }
        throw new AlreadyExist('sign up: email already exists');
      })
      .then((userCreated) => {
        userCreated = userCreated.toJSON();
        delete userCreated.password;
        ResponseService.sendSuccessResponse(res, userCreated);
      })
      .catch((err) => {
        next(err);
      });
  },

  facebook: (req, res, next) => {
    
  },

  google: (req, res, next) => {

  }
};