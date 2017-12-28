const mainMapper = require('../../main');

module.exports = {
  async signin(req, res, next) {
    delete req.user.password;
    mainMapper.setEntities(req, { userData: req.user });
    return next();
  },
};
