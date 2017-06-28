'use strict';

const _                   = require('lodash');
const DbService           = require(`${basePath}/app/services`).DB_SERVICE;
const userEnums           = require(`${basePath}/app/enums`).USER;
const userRolesEnums      = _.values(userEnums.ROLES);

let schemaData = {
  first_name  : { type: String, required: true },
  last_name   : { type: String, required: true },
  phone       : {
    is_public : { type: Boolean, default: false },
    value     : { type: Number, min: 1000000000, max: 999999999999 }
  },
  email       : { type: String, unique: true, required: true },
  password    : { type: String, required: true, select: false },
  role        : { type: String, enum: userRolesEnums, default: userEnums.ROLES.REGULAR_USER, required: true, select: false },
  photo: {
    url: { type: String }
  },
  statuses: {
    is_active: { type: Boolean, default: true }
  },
  tokens: {
    forgot_password: {
      value           : { type: String },
      expiration_date : { type: Date }
    }
  }
};

let schemaOptions = {
  toJSON      : { getters: true },
  toObject    : { getters: true }
};


module.exports = DbService.createSchema(schemaData, schemaOptions);