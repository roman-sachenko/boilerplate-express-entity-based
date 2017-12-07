'use strict';

/**
 * Logger Service
 * Saves to file by default
 */

const MainService   = require('../main');
const logProvider   = require('winston');
const fsProvider    = require('fs');
const path          = require('path');
const shell         = require('shelljs');
require('winston-daily-rotate-file');


module.exports = class Logger extends MainService {
  constructor(options) {
    super();
    let self = this;
    self._options = options || {};
    self._options.fileName          = self._options.fileName        || '_log.log';
    self._options.dirPathRelative   = self._options.dirPathRelative || '';
    self._options.rootLogDir        = 'logs';
    self._options.dirFullPath       = path.normalize(`${basePath}/${self._options.rootLogDir}/${self._options.dirPathRelative}/`);
    self._fsProvider                = fsProvider;
    self._logTransports             = [];

    self._dirCreateIfNotExist(self._options.dirFullPath);

    self._logTransports.push(new logProvider.transports.DailyRotateFile({
      name          : 'file',
      prepend       : true,
      json          : true,
      maxsize       : 2500000,
      level         : 'info',
      datePattern   : 'yyyy-MM-dd',
      zippedArchive : false,
      filename      : path.normalize(`${self._options.dirFullPath}/${self._options.fileName}`)
    }));

    if(self._options.consoleLog) {
      self._logTransports.push(new logProvider.transports.Console());
    }

    self._loggerProvider = new logProvider.Logger({
      transports: self._logTransports
    });

  }

  _dirCreateIfNotExist(dirPath) {
    let self = this;
    if(!self._fsProvider.existsSync(dirPath)) {
      shell.mkdir('-p', dirPath);
    }
    return true;

  }

  log(message, level) {
    let self = this;
    if(level) {
      self._loggerProvider[level](message);
    } else {
      self._loggerProvider.info(message);
    }
  }
};
