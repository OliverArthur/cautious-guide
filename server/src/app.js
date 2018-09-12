require('dotenv').config()
const mongoose = require('mongoose')
const { options, server } = require('./config/graphql')

// MongoDB settings
const db = mongoose.connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

db.on('error', err => {
  console.error('connection error;', err);
});

db.once('open', callback => {
  console.info('Connection Succeeded!!')
})

// Disabled for security
server.express.settings['x-powered-by'] = false

server.start(options, ({ port }) => console.log(`Server is running on port ${port}`))
