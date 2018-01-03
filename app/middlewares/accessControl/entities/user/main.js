const mainAcl         = require('../main');
const { Forbidden }   = require(`${basePath}/app/utils/apiErrors`);

module.exports = {

  async updateOne(req, res, next) {
    
    if (mainAcl.isAdmin(req.user)) {
      return next();
    }

    if (req.body.role) {
      return next(new Forbidden('can not update user role'));
    }

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if (userIdRequested === userIdCurrent) {
      return next();
    }

    return next(new Forbidden());
  },

  async getOne(req, res, next) {
    if (mainAcl.isAdmin(req.user)) {
      return next();
    }

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if (userIdRequested === userIdCurrent) {
      return next();
    }

    return next(new Forbidden());
  },

  async getAll(req, res, next) {
    next();
  },

  async deleteOne(req, res, next) {

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if (!(userIdRequested === userIdCurrent)) {
      return next();
    }

    return next(new Forbidden('can\'t remove yourself'));
  },
};
