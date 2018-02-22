module.exports = {
  apps: [
    {
      name: 'express-lemon',
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
      env: require('./config/env/env.js'),
      env_local: require('./config/env/env.local'),
      env_staging: require('./config/env/env.staging'),
      env_production: require('./config/env/env.production'),
    },
  ],
};
