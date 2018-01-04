const { EntityLoaderService, ResponseService, UserService } = require(`${basePath}/app/services`);

module.exports = {
  async changePassword(req, res, next) {
    const user = EntityLoaderService.getEntity(req, 'user');
    const userService = new UserService(user);

    try {
      let updatedUser = await userService.changePassword(req.body.new_password);
      updatedUser = updatedUser.toJSON();
      delete updatedUser.password;
      ResponseService.sendSuccessResponse(res, updatedUser);
    } catch (err) {
      return next(err);
    }
  },
};
