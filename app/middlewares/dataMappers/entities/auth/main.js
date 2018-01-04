const mainMapper = require('../../main');

module.exports = {
  async signIn(req, res, next) {
    return next();
  },

  async signUp(req, res, next) {
    delete req.body.role;
    mainMapper.setEntities(req, { signUpData: req.body });
    return next();
  },
};
