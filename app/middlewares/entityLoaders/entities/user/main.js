const MainLoader    = require('../../main');
const { DbService } = require(`${basePath}/app/services/`);
const { NotFound }  = require(`${basePath}/app/utils/apiErrors`);
const mainHelper    = require(`${basePath}/app/helpers`);
const UserModel     = DbService.models().User;

module.exports = {
  
  async updateOne(req, res, next) {

    try {
      const userFound = await UserModel.findOne({ _id: req.params.userId });

      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }

  },

  async getOne(req, res, next) {

    try {
      const userFound = await UserModel.findOne({ _id: req.params.userId }).lean();

      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }
  },

  async getAll(req, res, next) {

    try {
      const usersFound = await UserModel.find({}).lean();
      MainLoader.setEntities(req, { users: usersFound });
      return next();

    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {

    try {
      const userFound = await UserModel.findOne({ _id: req.params.userId }).select('_id');

      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }

  },
};
