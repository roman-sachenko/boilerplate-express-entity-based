'use strict';

const EventEmitter  = require('events');
const config        = require(`${basePath}/config/app`);

module.exports = class MainService extends EventEmitter {
  constructor(name) {
    super().setMaxListeners(0);
    this._serviceName = name || '';
    this._config      = config;
  }

  _getConfig() {
    return this._config.mailService;
  }

  throwError(err) {
    let self = this;
    let errorMessage = err.stack || err;
    throw new Error(`${self._serviceName}: ${errorMessage}`);
  }
};