const cpusLength = require('os').cpus().length;
const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);
/**
 * Parses .env files to retrieve config variables
 */
require('dotenv-safe').load({ path: `${basePath}/.env`, sample: `${basePath}/.env_example` });

const cluster = require('cluster');
const { LogService } = require('../app/services');
const appConfig = require('../config/app');

const httpLogger = appConfig.app.isLoggerEnabled ? new LogService({ dirPathRelative: '/http-logs' }) : null;
const numberOfInstances = appConfig.env.instancesCount || cpusLength;

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

function startInstances(inputCluster, instanceLim) {
  for (let i = 0; i < instanceLim; i++) {
    inputCluster.fork();
  }
}

function onExit(worker) {
  console.log(`worker ${worker.process.pid} died`);
}

function onUncaughtException(err) {
  if (httpLogger) {
    httpLogger.log(err, 'error');
  }
  console.log(err);
  process.exit(1);
}
