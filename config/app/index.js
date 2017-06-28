'use strict';

/**
 * Application config file
 * Takes default config and assign(merge) environment specifications
 */

const _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let initGlobalConfig = function () {

  let defaultConfig       = require('./env/default');
  let environmentConfig   = require('./env/' + process.env.NODE_ENV);

  return _.merge(defaultConfig, environmentConfig);
};

module.exports = initGlobalConfig();