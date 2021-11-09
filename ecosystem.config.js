module.exports = {
  apps: [
    {
      name: 'NODE-SERVER',
      script: 'server.js',
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '7800M',
      node_args: ['--max_old_space_size=8000'],
    },
  ],
};
