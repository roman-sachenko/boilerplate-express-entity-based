'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

require(`${basePath}/app/services`);

require(`${basePath}/app/models/entities/User`);

const { DbService, ResponseService, LoggerService } = require(`${basePath}/app/services`);

const appConfig         = require(`${basePath}/config/app`);
const WorkEnvs          = require(`${basePath}/app/enums`).WORK_ENVS;
const { NotFound }      = require(`${basePath}/app/utils/apiErrors`);
const customValidators  = require(`${basePath}/app/validators/custom`);

const dbService   = new DbService({ connectionString: appConfig.db.connectionString });
const httpLogger  = appConfig.app.isLoggerEnabled ? new LoggerService({ dirPathRelative: '/http-logs'}) : null;

const passport    = require(`${basePath}/app/libs/passport`).init(appConfig);
const http              = require('http');
const app               = new require('express')();
const helmet            = require('helmet');
const expressValidator  = require('express-validator');
const bodyParser        = require('body-parser');

const port    = process.env.ENV_PORT || appConfig.env.PORT;
const server  = http.Server(app).listen(port, () => {
  console.log(`Hell yeah on port  ${port}`);
});


//Establishing DB Connection
dbService.connect();

/**
 * App Middlewares
 */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(helmet())
  .use(expressValidator({
    customValidators,
  }))
  .use('/api/v1', require('./routes/v1'))
  .use(routeNotFoundHandler)
  .use(mainErrorHandler);



/**
 * 
 * Server Handlers
 */
function routeNotFoundHandler(req, res, next) {
  ResponseService.sendErrorResponse(res, new NotFound('route not found'));
}

function mainErrorHandler(err, req, res, next) {
  let error = {};
  if(err && err.status && err.message){
    error = err;
  } else {
    if(!(req.app.get('env') === WorkEnvs.LOCAL)) {
      error.message = 'Ooops, something went wrong';
    } else {
      error.message = err.stack || err;
    }
  }

  if(httpLogger) {
    httpLogger.log(Object.assign(req, error), 'error');
  }
  
  ResponseService.sendErrorResponse(res, error);
}