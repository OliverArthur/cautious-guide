const jwt = require('jsonwebtoken')
require('dotenv').config()

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization && Authorization.length) {
    const token = Authorization.replace('Bearer ', '')
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    return id;
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  AuthError,
  getUserId
}
