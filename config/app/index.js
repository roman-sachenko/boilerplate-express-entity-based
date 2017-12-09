'use strict';

module.exports = {
  db: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },

  env: {
    PORT: process.env.NODE_SERVER_PORT || 3000,
    instancesCount: parseInt(process.env.NODE_INSTANCES_COUNT) || 1,
  },

  app: {
    isLoggerEnabled: parseInt(process.env.APP_LOGGER_ENABLED) || 0,
  },

  social: {
    facebook: {
      appId           : process.env.SOCIAL_FACEBOOK_APP_ID,
      app_Secret      : process.env.SOCIAL_FACEBOOK_APP_SECRET,
      appCallbackUrl  : process.env.SOCIAL_FACEBOOK_CALLBACK_URL,
    },

    google: {
      appCallbackUrl: {
        appCallbackUrl: process.env.SOCIAL_GOOGLE_CALLBACK_URL,
      }
    }
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  }
};
