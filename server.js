'use strict';

const path                = require('path');
global.basePath           = path.normalize(`${__dirname}`);
const cluster             = require('cluster');
const numberOfInstances   = require('os').cpus().length;


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
  process.exit(1);
}