'use strict';

module.exports = {
  db: {
    connectionString: 'mongodb://localhost/local_db'
  },

  env: {
    PORT: 3000
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
