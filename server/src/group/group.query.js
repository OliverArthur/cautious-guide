const { getUserId } = require('../utils')

const UserSchema = require('../user/user.model')
const GroupSchema = require('../group/group.model')

const GroupQuery = {
  /**
   * Method to get all the groups
   *
   * @param {*} _
   * @param {*} args
   * @param {Object} context
   * @returns Object
   */
  async getGroups (_, args, context) {
    const userId = getUserId(context)
    const team = (await UserSchema.findById(userId)).team
    return await GroupSchema.find({team}).sort({ createdAt: -1 })
  },
  /**
   * Method to get a single group
   *
   * @param {*} _
   * @param {String} {id}
   * @param {Object} context
   * @returns Object
   */
  async getGroup (_, {id}, context) {
    const userId = getUserId(context)
    const group = await GroupSchema.findById(id).populate('users')
    return group
  },
}

module.exports = { GroupQuery }
