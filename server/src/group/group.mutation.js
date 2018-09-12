const UserSchema = require('../user/user.model')
const GroupSchema = require('../group/group.model')
const { getUserId } = require('../utils')


const GroupMutation = {
  /**
   * Method to allow user to create a group
   *
   * @param {*} _
   * @param {String} {name, initials, avatarColor, users}
   * @param {Object} context
   * @returns Object
   */
  async createGroup (_, {name, initials, avatarColor, users}, context) {
    const userId = getUserId(context)
    const team = (await UserSchema.findById(userId)).team
    return await GroupSchema.create({
      name,
      team,
      initials,
      avatarColor,
      users
    })
  },
  /**
   * Method to allow team owner to invite an user to a group
   *
   * @param {*} _
   * @param {String} {id, users}
   * @param {Object} context
   * @returns Object
   */
  async addUsersToGroup (_, {id, users}, context) {
    const userId = getUserId(context)
    return await GroupSchema.findOneAndUpdate(
      { _id: id },
      { $push: { users: { $each: users } } },
      { new: true }
    )
  },
}

module.exports = { GroupMutation }
