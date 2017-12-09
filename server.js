'use strict';

/**
 * Allows the system to read .env file
 */
require('dotenv').config();

const path                = require('path');
global.basePath           = path.normalize(`${__dirname}`);
const cluster             = require('cluster');
const { LoggerService }   = require(`${basePath}/app/services`);
const appConfig           = require(`${basePath}/config/app`);

const httpLogger          = appConfig.app.isLoggerEnabled ? new LoggerService({ dirPathRelative: '/http-logs'}) : null;
const numberOfInstances   = appConfig.env.instancesCount || require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  startInstances(cluster, numberOfInstances);
  cluster.on('exit', onExit);

} else {
  console.log(`Worker ${process.pid} started`);
  process
    .on('uncaughtException', onUncaughtException);

  require('./app');
}

function startInstances(cluster, instanceLim) {
  for (let i = 0; i < instanceLim; i++) {
    cluster.fork();
  }
}

function onExit(worker, code, signal) {
  console.log(`worker ${worker.process.pid} died`);
}

function onUncaughtException(err) {
  if(httpLogger) {
    httpLogger.log(err, 'error');
  }
  console.log(err);
  process.exit(1);
}