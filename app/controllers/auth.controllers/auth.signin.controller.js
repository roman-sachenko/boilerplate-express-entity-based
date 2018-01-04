const { AuthService, ResponseService, UserService } = require(`${basePath}/app/services`);
const authStrategiesEnum = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const authService = new AuthService();

module.exports = {
  async signin(req, res, next) {

    try {
      const authResult = await authService.authenticate(req, authStrategiesEnum.USER_LOCAL);
      const userService = new UserService(authResult.user);
      const updatedUser = await userService.update({
        tokens: {
          access_token: authResult.accessToken,
          refresh_token: authResult.refreshToken,
        },
      });

      const mappedUser = mapUserData(updatedUser);
      const responseData = mapSignInResponse(mappedUser, authResult);

      ResponseService.sendSuccessResponse(res, responseData);
    } catch (err) {
      return next(err);
    }
  },
};

function mapUserData(updatedUser) {
  const mappedUser = updatedUser.toObject();

  delete mappedUser.password;
  delete mappedUser.tokens;

  return mappedUser;
}

function mapSignInResponse(user, authResult) {
  return Object.assign({
    user,
    tokens: 
      {
        accessToken: authResult.accessToken,
        refreshToken: authResult.refreshToken,
      },
  });
}
