const path = require('path')

module.exports = [
  {
    method: 'GET',
    path: '/files/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      },
    },
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.resolve(process.cwd(), 'dist'),
        redirectToSlash: true,
        index: true,
      },
    },
  },
]
