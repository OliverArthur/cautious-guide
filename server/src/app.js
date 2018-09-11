require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import')

// New express instance
const app = express();

app.disabled('x-powered-by')
app.use(helmet())

// Cors settings
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5500'
];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const resolvers = require('./resolvers')

// Mongoose settings
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', err => {
  console.error('connection error;', err);
});

db.once('open', callback => {
  console.info('Connection Succeeded!!')
})

// Graphql settings
const server = new ApolloServer({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
  context: req => req
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT || 5500 }, () => {
  console.log('Apollo Server on http://localhost:5500/graphql');
});

// app.listen(options, ({ port }) => console.log(`Server is running on port ${port}`))
