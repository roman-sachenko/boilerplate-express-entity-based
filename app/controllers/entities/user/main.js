'use strict';

const { EntityLoaderService, ResponseService, UserService } = require(`${basePath}/app/services`);


module.exports = {
  createOne: (req, res, next) => {

  },

  updateOne: (req, res, next) => {
    const user        = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);

    return userService.update(req.body)
      .then((deletedUser) => {
        ResponseService.sendSuccessResponse(res, { user: deletedUser });
      })
      .catch((err) => {
        next(err);
      });
  },

  getOne: (req, res, next) => {

    try {
      const user = EntityLoaderService.getEntity(req, 'user');
      ResponseService.sendSuccessResponse(res, user);
    } catch(err) {
      next(err);
    }
  },

  getAll: (req, res, next) => {
    try {
      const users = EntityLoaderService.getEntity(req, 'users');
      ResponseService.sendSuccessResponse(res, users);
    } catch(err) {
      next(err);
    }
  },

  deleteOne: (req, res, next) => {
    const user        = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);

    return userService.remove()
      .then((deletedUser) => {
        ResponseService.sendSuccessResponse(res, { user: deletedUser });
      })
      .catch((err) => {
        next(err);
      });
  },

  deleteMultiple: (req, res, next) => {

  }
};