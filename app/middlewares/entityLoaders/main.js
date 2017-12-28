const { EntityLoaderService } = require(`${basePath}/app/services`);

module.exports = {
  setEntities(req, entities) {
    if (!req.entities) {
      req.entities = {};
    }
    req.entities.loaded = EntityLoaderService.setEntity(req, entities);
  },
};
