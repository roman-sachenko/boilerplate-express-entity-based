const config = require(`${basePath}/config/app`);
const EventEmitter = require('events');

module.exports = class MainService extends EventEmitter {
  constructor(name) {
    super();
    this._serviceName = name || '';
    this._config = config;
  }

  _getConfig() {
    return this._config;
  }

  throwError(err) {
    const self = this;
    const errorMessage = err.stack || err;
    throw new Error(`${self._serviceName}: ${errorMessage}`);
  }
};
