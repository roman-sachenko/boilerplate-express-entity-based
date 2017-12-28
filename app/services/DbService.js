/**
 * Database Service/Wrapper
 */

const MainService = require('./MainService');
const dbServiceProvider   = require('mongoose');

module.exports = class DbService extends MainService {
  constructor(options) {
    super('DB Service');
    const self = this;
    self._dbProvider          = dbServiceProvider;
    self._dbProvider.Promise  = global.Promise;
    self._options           = options;
    self.connection         = false;

    if (!(self._options && self._options.connectionString)) {
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

  static dropDatabase() {
    return dbServiceProvider.connection.dropDatabase();
  }

  connect() {
    this.connection = this._dbProvider.createConnection(this._options.connectionString);
    this._dbProvider.connect(this._options.connectionString, { useMongoClient: true });
    return this.connection;
  }
};
