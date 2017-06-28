'use strict';

/**
 * Database Service/Wrapper
 */

const dbServiceProvider   = require('mongoose');
const MainService         = require('../main');

module.exports = class DbService extends MainService {
  constructor(options) {
    super('DB Service');
    let self = this;
    self._dvProvider          = dbServiceProvider;
    self._dvProvider.Promise  = global.Promise;
    self._options           = options;
    self.connection         = false;

    if(!(self._options && self._options.connectionString)) {
      super.throwError('database connection string is not provided');
    }
  }

  static getSchemaTypes() {
    return dbServiceProvider.Schema.Types;
  }

  static createSchema(schemaData, options) {
    return new dbServiceProvider.Schema(schemaData, options);
  }

  static createModel(modelName, schema) {
    dbServiceProvider.Promise = global.Promise;
    return dbServiceProvider.model(modelName, schema);
  }


  static models() {
    return dbServiceProvider.models;
  }

  connect() {
    let self = this;
    self.connection = self._dvProvider.createConnection(self._options.connectionString);
    self._dvProvider.connect(self._options.connectionString, { useMongoClient: true });
    return self.connection;
  }
};
