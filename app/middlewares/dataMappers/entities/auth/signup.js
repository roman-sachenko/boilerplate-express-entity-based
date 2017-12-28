const mainMapper = require('../../main');

module.exports = {
  async regular(req, res, next) {
    delete req.body.role;
    mainMapper.setEntities(req, { signUpData: req.body });
    return next();
  },
};
