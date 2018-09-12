require('dotenv').config()
const { importSchema } = require('graphql-import')
const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('../resolvers')

const options = {
  port: process.env.PORT || 5500,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  debug: process.env.DEBUG,
  cors: {
    origin: ['localhost:8080', 'localhost:5500'],
    optionsSuccessStatus: 204
  }
}

const server = new GraphQLServer({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
  context: req => req
})


module.exports = {
  options,
  server
}
