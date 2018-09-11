const jwt = require('jsonwebtoken')
require('dotenv').config()

function getUserId(context) {
  const Authorization = context.req.headers.autherizantion
  if (Authorization && Authorization.length) {
    const token = Authorization.replace('user-token ', '')
    const id = jwt.verify(token, process.env.JWT_SECRET)
    return id;
  }

  throw new Error('Not authenticated')
}

module.exports = {
  getUserId,
}
