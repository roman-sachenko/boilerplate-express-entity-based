/**
 * Service to load and get entities from Request.
 * The system will set loaders from storage entities (ex. users) to request
 */

const MainService = require('./MainService');

module.exports = class EntityLoader extends MainService {
  constructor() {
    super('Entity Loader');
  }

  static setEntity(req, entityObj) {
    if (!req.entities) {
      req.entities = {};
    }

    if (!req.entities.loaded) {
      req.entities.loaded = {};
    }

    return Object.assign(req.entities.loaded, entityObj);
  }

  static getEntity(req, key) {

    if (!(req.entities && req.entities.loaded && req.entities.loaded[key])) {
      return null;
    }
    return req.entities.loaded[key];
  }
};
