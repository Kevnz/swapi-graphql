const config = require('xtconf')()

module.exports = {
  development: config.get('database'),
  test: config.get('database'),
  staging: config.get('database'),
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/migrations',
    },
  },
}
