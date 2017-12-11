'use strict';

const { EntityLoaderService, ResponseService, UserService } = require(`${basePath}/app/services`);


module.exports = {
  createOne: async (req, res, next) => {

  },

  updateOne: async (req, res, next) => {
    const user        = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);

    try {
      const updatedUser =  await userService.update(req.body)
      ResponseService.sendSuccessResponse(res, updatedUser);
    } catch(err) {      
      return next(err);  
    }
  },

  getOne: async (req, res, next) => {

    try {
      const user = EntityLoaderService.getEntity(req, 'user');
      ResponseService.sendSuccessResponse(res, user);
    } catch(err) {
      return next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = EntityLoaderService.getEntity(req, 'users');
      ResponseService.sendSuccessResponse(res, users);
    } catch(err) {
      return next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    const user        = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);

    try {
      const deletedUser = await userService.remove();
      ResponseService.sendSuccessResponse(res, deletedUser);
    } catch(err) {
      return next(err);
    }

  },

  deleteMultiple: async (req, res, next) => {

  }
};