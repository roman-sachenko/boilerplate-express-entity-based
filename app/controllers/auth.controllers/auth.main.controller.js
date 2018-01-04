const { AuthService, DbService, ResponseService, UserService } = require(`${basePath}/app/services`);
const authStrategiesEnum = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const helpers = require(`${basePath}/app/helpers`);
const { AlreadyExist } = require(`${basePath}/app/utils/apiErrors`);
const UserModel = DbService.models().User;
const authService = new AuthService();

module.exports = {
  async signUp(req, res, next) {
    try {
      const { signUpData } = req.entities.mapped;
      const userSearchResult = await UserModel.findOne({ email: signUpData.email }).select('_id');


      if (!helpers.isObjectValid(userSearchResult)) {

        const userService = new UserService(signUpData);
        let userCreated = await userService.create();

        userCreated = userCreated.toJSON();
        delete userCreated.password;

        return ResponseService.sendSuccessResponse(res, userCreated);
      }

      throw new AlreadyExist('sign up: email already exists');

    } catch (err) {
      next(err);
    }
  },

  async signIn(req, res, next) {
    try {
      const authResult = await authService.authenticate(req, authStrategiesEnum.USER_LOCAL);
      ResponseService.sendSuccessResponse(res, authResult);
    } catch (err) {
      return next(err);
    }
  },

  async signOut(req, res, next) {
    try {
      await AuthService.signOut(req.user);
      return ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },

};
