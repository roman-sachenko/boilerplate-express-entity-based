const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);

const WorkEnvs = require(`${basePath}/app/enums`).WORK_ENVS;
process.env.NODE_ENV = process.env.NODE_ENV || WorkEnvs.LOCAL;

/**
 * Initialize Models
 */
require(`${basePath}/app/models/`);


/**
 * Require Needed Services
 */
const { DbService, ResponseService, LogService } = require(`${basePath}/app/services`);
const appConfig = require(`${basePath}/config/app`);
const customValidators = require(`${basePath}/app/validators/custom`);

/**
 * Create initial service instances
 */
const dbService = new DbService({ connectionString: appConfig.db.connectionString });
const httpLogger = appConfig.app.isLoggerEnabled ? new LogService({ dirPathRelative: '/http-logs' }) : null;

/**
 * Require platform services and modules
 */
const passport = require(`${basePath}/app/libs/passport`).init(appConfig);
const http = require('http');
const App = require('express');
const app = new App();
const helmet = require('helmet');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
// const cors = require('cors');

/**
 * Starts app server
 */
http.Server(app).listen(process.env.ENV_PORT, () => {
  console.log(`Hell yeah on port  ${process.env.ENV_PORT}`);
});


/**
 * Established DB Connection
 */
dbService.connect((err) => {
  throw new Error(err);
});

/**
 * Sets App Middlewares
 */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(helmet())
  .use(expressValidator({
    customValidators,
  }))
  // .use(cors({}))
  .use('/', require(`${basePath}/routes/`))
  .use(routeNotFoundHandler)
  .use(mainErrorHandler);

/**
 * Server Handlers
 */
/**
 * Route Not Found Error Handler
 */
function routeNotFoundHandler(req, res, next) {
  ResponseService.sendErrorResponse(res, new NotFound('route not found'));
}

/**
 * Catches all the errors and sends response
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function mainErrorHandler(err, req, res, next) {
  let error = {};

  if (err && err.status && err.message) {
    error = err;
  } else if (!(req.app.get('env') === WorkEnvs.LOCAL)) {
    error.message = 'Ooops, something went wrong';
  } else {
    error.message = err.stack || err;
  }

  if (httpLogger) {
    httpLogger.log(Object.assign(req, error), 'error');
  }
  ResponseService.sendErrorResponse(res, error);
}

module.exports = app;
