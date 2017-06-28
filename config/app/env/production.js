'use strict';

module.exports = {
  db: {
    connectionString: process.env.NODE_ENV.DB_CONNECTION_STRING
  },

  env: {
    PORT: process.env.NODE_ENV.ENV_PORT
  },

  redisStore: {
    url     : process.env.REDIS_STORE_URL,
    secret  : process.env.REDIS_STORE_SECRET
  },

  social: {
    facebook: {
      appId           : process.env.SOCIAL_FACEBOOK_APP_ID,
      app_Secret      : process.env.SOCIAL_FACEBOOK_APP_SECRET,
      appCallbackUrl  : process.env.SOCIAL_FACEBOOK_CALLBACK_URL
    },

    google: {
      appCallbackUrl: {
        appCallbackUrl: process.env.SOCIAL_GOOGLE_CALLBACK_URL
      }
    }
  },

  jwt: {
    secret: process.env.JWT_SECRET
  }
};

