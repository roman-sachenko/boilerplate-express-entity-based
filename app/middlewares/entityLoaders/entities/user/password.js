const { UserService } = require(`${basePath}/app/services/`);
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const mainHelper = require(`${basePath}/app/helpers`);
const MainLoader = require('../../main');


module.exports = {
  async sendForgotToken(req, res, next) {
    next();
  },

  async changePassword(req, res, next) {
    try {
      const userFound = await UserService
        .findOne({ query: { _id: req.params.userId, _company: req.params.companyId } });

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
