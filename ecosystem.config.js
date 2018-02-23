
const envMain = require('./config/env/env.js');
const envStaging = require('./config/env/env.staging');
const envProduction = require('./config/env/env.production');

let envLocal = {};
try {
  envLocal = require('./config/env/env.local');
} catch (err) {
  envLocal = {};
}

module.exports = {
  apps: [
    {
      name: 'true-peopling-api',
      script: './bin/server.js',
      args: [
        '--toto=heya coco',
        '-d',
        '1',
      ],
      watch: true,
      ignore_watch: [
        'node_modules',
        'logs',
        '.idea',
        '.git',
      ],
      node_args: '',
      merge_logs: true,
      cwd: './',
      env: envMain,
      env_local: envLocal,
      env_staging: envStaging,
      env_production: envProduction,
    },
  ],
};
