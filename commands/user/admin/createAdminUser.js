/**
 * Script to create admin user
 * @type {string}
 */
/**
* Allows the system to read .env file
*/
require('dotenv').config();

/**
 * Env configuration
 */
const path = require('path');

global.basePath = path.normalize(`${__dirname}/../../..`);
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

require(`${basePath}/app/models/User.model`);

/**
 * Include Services
 * @type {*}
 */
const { UserService, DbService } = require(`${basePath}/app/services`);
const appConfig = require(`${basePath}/config/app`);

const dbService = new DbService({ connectionString: appConfig.db.connectionString });

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
