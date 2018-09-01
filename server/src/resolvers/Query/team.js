const { User, Team } = require('../../models')
const { getUserId } = require('../../utils')

const TeamQuery = {
  async getTeam(_, args, context) {
    const userId = getUserId(context)
    const user = await User.findById(userId)
    return await Team.findById(user.team)
  },
}

module.exports = { TeamQuery }
