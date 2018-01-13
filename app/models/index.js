const { requireAllFromDir } = require(`${basePath}/app/helpers`);

module.exports = requireAllFromDir(__dirname, {
  skipFiles: ['index.js'],
  extFilter: ['.js'],
});
