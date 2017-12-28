const { requireAllFromDir } = require(`${basePath}/app/helpers`);

module.exports = requireAllFromDir(__dirname, {
  skipFiles: ['index.js', 'MainService.js'],
  extFilter: ['.js'],
});
