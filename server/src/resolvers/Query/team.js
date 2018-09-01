const { getUserId } = require('../../utils')

const UserSchema = require('../../models/user')
const TeamSchema = require('../../models/team')

const TeamQuery = {
  async getTeam(_, args, context) {
    const userId = getUserId(context)
    const user = await UserSchema.findById(userId)
    return await TeamSchema.findById(user.team)
  },
}

module.exports = { TeamQuery }
