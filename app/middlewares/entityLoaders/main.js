'use strict';

module.exports = {
  setEntities: (req, entities) => {
    if (!req.entities) {
      req.entities = {};
    }

    if (!req.entities.loaded) {
      req.entities.loaded = {};
    }

    req.entities.loaded = entities;
  }
};