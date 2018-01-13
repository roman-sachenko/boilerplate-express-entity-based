const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);

const WorkEnvs = require(`${basePath}/app/enums`).WORK_ENVS;
process.env.NODE_ENV = process.env.NODE_ENV || WorkEnvs.LOCAL;

require(`${basePath}/app/models/User.model`);

const { DbService, ResponseService, LogService } = require(`${basePath}/app/services`);

const appConfig = require(`${basePath}/config/app`);
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const customValidators = require(`${basePath}/app/validators/custom`);

const dbService = new DbService({ connectionString: appConfig.db.connectionString });
const httpLogger = appConfig.app.isLoggerEnabled ? new LogService({ dirPathRelative: '/http-logs' }) : null;

const passport = require(`${basePath}/app/libs/passport`).init(appConfig);
const http = require('http');
const App = require('express');
const app = new App();
const helmet = require('helmet');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
// const cors = require('cors');

/**
 * Starts app server
 */
const port = process.env.ENV_PORT || appConfig.env.PORT;

http.Server(app).listen(port, () => {
  console.log(`Hell yeah on port  ${port}`);
});


/**
 * Established DB Connection
 */
dbService.connect();

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
  .use('/api/v1', require(`${basePath}/routes/v1`))
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
