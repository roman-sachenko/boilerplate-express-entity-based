module.exports = {
  setEntities(req, entities) {
    if (!req.entities) {
      req.entities = {};
    }

    if (!req.entities.mapped) {
      req.entities.mapped = {};
    }

    req.entities.mapped = entities;
  },
};
