require('dotenv').config()
const { importSchema } = require('graphql-import')
const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')

const resolvers = require('./resolvers')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', err => {
  console.error('connection error;', err);
});

db.once('open', callback => {
  console.info('Connection Succeeded!!')
})

const server = new GraphQLServer({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
  context: req => req
})

const options = {
  port: process.env.PORT || 5500,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  debug: process.env.DEBUG
}

server.start(options, ({ port }) => console.log(`Server is running on port ${port}`))
