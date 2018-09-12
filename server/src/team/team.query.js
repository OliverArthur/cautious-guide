const { getUserId } = require('../utils')

const UserSchema = require('../user/user.model')
const TeamSchema = require('../team/team.model')

const TeamQuery = {
  async getTeam(_, args, context) {
    const userId = getUserId(context)
    const user = await UserSchema.findById(userId)
    return await TeamSchema.findById(user.team)
  },
}

module.exports = { TeamQuery }
