const mongoose = require('mongoose')
const { User } = require('../../models')
const { getUserId } = require('../../utils')
const ObjectId = mongoose.Types.ObjectId

const UserQuery = {
  async getUsers(_, args, context) {
    const userId = getUserId(context)
    const team = (await User.findById(userId)).team
    return await User.find({
      team
    })
  },

  async getUser(_, { id }, context) {
    const userId = getUserId(context)
    return await User.findById(id || userId)
  },
}

module.exports = { UserQuery }
