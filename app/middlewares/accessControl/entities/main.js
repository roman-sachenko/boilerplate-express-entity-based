const { DbService } = require(`${basePath}/app/services`);
const UserModel     = DbService.models().User;

module.exports = {
  isAdmin(user) {
    return !!(user && user.role && user.role === UserModel.ROLES.ADMIN);
  },
};
