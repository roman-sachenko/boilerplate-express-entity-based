/**
 * Script to create admin user
 * @type {string}
 */

/**
 * Env configuration
 */
if (!process.env.NODE_ENV) {
  throw new Error('Environment is not specified, NODE_ENV is undefined. Run script with a specific environment (NODE_ENV=env_name)');
}

const path = require('path');
global.basePath = path.normalize(`${__dirname}/../../..`);

require(`${basePath}/app/models/User.model`);

const mainEnvVariables = require(`${basePath}/config/env/env`);
const envBasedVariables = require(`${basePath}/config/env/env.${process.env.NODE_ENV}`);
Object.assign(process.env, mainEnvVariables, envBasedVariables);

/**
 * Include Services
 * @type {*}
 */
const { UserService, DbService } = require(`${basePath}/app/services`);


const dbService = new DbService({ connectionString: process.env.DB_CONNECTION_STRING });

const newAdminData = require('./config').adminData;

/**
 * Open Database Connection
 */
dbService.connect();


/**
 * Main function to perform admin creation process
 */
const createAdmin = async () => {
  try {
    const searchResult = await UserService.findOne({ query: { email: newAdminData.email } });

    if (isObjectValid(searchResult)) {
      throw new Error('Already Exists');
    }

    const userService = new UserService(newAdminData);
    await userService.create();

    log('SUCCESS: Admin user has been created');
    exitScript();

  } catch (err) {
    log(`ERROR: ${err}`);
    exitScript();
  }
};

function log(message) {
  console.log(message);
}

function exitScript() {
  process.exit();
}

function isObjectValid(obj) {
  return !!(obj && Object.keys(obj) && Object.keys(obj).length);
}


createAdmin();
