module.exports = {

  updateOne(req, res, next) {
    if (!(req.body.password && req.body.confirm_password)) {
      delete req.body.password;
      delete req.body.confirm_password;
    }
    return next();
  },

  getOne(req, res, next) {
    return next();
  },

  getAll(req, res, next) {
    return next();
  },
};
