const { getUserId } = require('../utils')

const UserSchema = require('./user.model')

const UserQuery = {
  async getUsers(_, args, context) {
    const userId = getUserId(context)
    const team = (await UserSchema.findById(userId)).team
    return await UserSchema.find({
      team
    })
  },

  async getUser(_, { id }, context) {
    const userId = getUserId(context)
    return await UserSchema.findById(id || userId)
  },
}

module.exports = { UserQuery }
