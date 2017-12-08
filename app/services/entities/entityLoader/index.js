'use strict';

/**
 * Service to load and get entities from Request.
 * The system will set loaders from storage entities (ex. users) to request
 */

const MainService = require('../main');

module.exports = class EntityLoader extends MainService {
  constructor() {
    super('Entity Loader');
  }

  setEntity(req, entityObj) {
    if(!req.entities) {
      req.entities = {};
    }

    if(!req.entities.loaded) {
      req.entities.loaded = {};
    }

    return Object.assign(req.entities.loaded, obj);
  }

  getEntity(req, key) {
    if(!(req.entities && req.entities.loaded && req.entities.loaded.key)) {
      return null;
    }
    return req.entities.loaded.key;
  }
};