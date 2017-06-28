'use strict';

module.exports = {
  db: {
    connectionString: 'mongodb://localhost/endgame_db'
  },

  env: {
    PORT: 3000
  },

  redisStore: {
    url       : 'redis://localhost:6379',
    secret    : 'Take a look to the sky just before you die'
  },

  social: {
    facebook: {
      appId           : '',
      app_Secret      : '',
      appCallbackUrl  : 'http://localhost:3000/auth/facebook/callback'
    },

    google: {
      appCallbackUrl: {
        appCallbackUrl: 'http://localhost:3000/auth/google/callback'
      }
    }
  },

  jwt: {
    secret: 'And you point your finger but there\'s no one around'
  }
};
