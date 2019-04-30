const PORT = process.env.PORT
require('xtconf')()
const Path = require('path')
const { ApolloServer } = require('apollo-server-hapi')
const Hapi = require('hapi')
const Sentry = require('@sentry/node')

Sentry.init({ dsn: process.env.SENTRY })

const Manifest = require('./manifest')
const Types = require('./graphql/types')
const Resolvers = require('./graphql/resolvers')
let app

const start = async () => {
  try {
    const server = new ApolloServer({
      typeDefs: Types,
      resolvers: Resolvers,
      introspection: true,
      playground: true,
    })
    app = Hapi.server({
      port: PORT || process.env.PORT,
      routes: {
        files: {
          relativeTo: Path.join(process.cwd(), 'dist'),
        },
        cors: {
          origin: ['*'],
          additionalHeaders: ['x-media-server', 'content-type'],
        },
      },
    })
    await app.register(Manifest)
    app.ext('onPreResponse', function(request, h) {
      if (request.response.isBoom) {
        return h.file('index.html')
      }
      return h.continue
    })
    await server.applyMiddleware({
      app,
    })

    await server.installSubscriptionHandlers(app.listener)

    await app.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('🚀 Server running')
}

process.on('SIGINT', async () => {
  console.log('stopping server')
  try {
    await app.stop({ timeout: 10000 })
    console.log('The server has stopped 🛑')
    process.exit(0)
  } catch (err) {
    console.error('shutdown server error', err)
    process.exit(1)
  }
})

start()
