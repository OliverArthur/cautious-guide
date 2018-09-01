const { User, Group } = require('../../models')
const { getUserId } = require('../../utils')

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
    const team = (await User.findById(userId)).team
    return await Group.find({team}).sort({ createdAt: -1 })
    return group
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
    const group = await Group.findById(id).populate('users')
    return group
  },
}

module.exports = { GroupQuery }
