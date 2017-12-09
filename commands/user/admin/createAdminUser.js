'use strict';

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
const path              = require('path');
global.basePath         = path.normalize(`${__dirname}/../../..`);
process.env.NODE_ENV    = process.env.NODE_ENV || 'local';

require(`${basePath}/app/models/entities/User`);

/**
 * Include Services
 * @type {*}
 */
const { DbService, UserService } = require(`${basePath}/app/services`);
const appConfig = require(`${basePath}/config/app`);

const dbService     = new DbService({ connectionString: appConfig.db.connectionString });
const UserModel     = DbService.models()['User'];

const newAdminData  = require('./config').adminData;


/**
 * Open Database Connection
 */
dbService.connect();


/**
 * Main function to perform admin creation process
 */
function createAdmin() {
  UserModel.findOne({ email: newAdminData.email })
    .then((searchResult) => {
      if(!isObjectValid(searchResult)) {
        const userService = new UserService(newAdminData);
        return userService.create();
      }
      throw new Error('Already Exists');
    })
    .then((createdUser) => {
      return createdUser.save();
    })
    .then((savedUser) => {
      log(`SUCCESS: Admin has been created with email: ${savedUser.email}`);
      exitScript();
    })
    .catch((err) => {
      log(`ERROR: ${err}`);
      exitScript();
    });
}

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