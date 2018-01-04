const { DbService } = require(`${basePath}/app/services/`);
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const mainHelper = require(`${basePath}/app/helpers`);
const MainLoader = require('../../main');

const UserModel = DbService.models().User;


module.exports = {
  async sendForgotToken(req, res, next) {
    next();
  },

  async changePassword(req, res, next) {
    try {
      const userFound = await UserModel
        .findOne({ _id: req.params.userId, _company: req.params.companyId });

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
