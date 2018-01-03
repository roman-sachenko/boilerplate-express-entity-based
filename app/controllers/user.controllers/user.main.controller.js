const { EntityLoaderService, ResponseService, UserService, DbService } = require(`${basePath}/app/services`);
const UserModel = DbService.models().User;
const helpers = require(`${basePath}/app/helpers`);
const { AlreadyExist } = require(`${basePath}/app/utils/apiErrors`);


module.exports = {

  async updateOne(req, res, next) {
    const user = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);
    const updateData = req.body;

    try {
      if (updateData.email && updateData.email !== req.user.email) {
        const userSearchResult = await UserModel.findOne({ email: updateData.email }).select('_id');
        if (helpers.isObjectValid(userSearchResult)) {
          throw new AlreadyExist('email already exists');
        }
      }
      const updatedUser = await userService.update(req.body);
      ResponseService.sendSuccessResponse(res, updatedUser);
    } catch (err) {
      return next(err);
    }
  },

  async getOne(req, res, next) {

    try {
      const user = EntityLoaderService.getEntity(req, 'user');
      ResponseService.sendSuccessResponse(res, user);
    } catch (err) {
      return next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const users = EntityLoaderService.getEntity(req, 'users');
      ResponseService.sendSuccessResponse(res, users);
    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {
    const user = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);

    try {
      const deletedUser = await userService.remove();
      ResponseService.sendSuccessResponse(res, deletedUser);
    } catch (err) {
      return next(err);
    }

  },
};
