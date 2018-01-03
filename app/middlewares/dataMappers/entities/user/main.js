module.exports = {

  updateOne(req, res, next) {
    delete req.body.password;
    delete req.body.confirm_password;
    return next();
  },

  getOne(req, res, next) {
    return next();
  },

  getAll(req, res, next) {
    return next();
  },
};
