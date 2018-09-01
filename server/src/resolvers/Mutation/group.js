const { User, Group } = require('../../models')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const { getUserId } = require('../../utils')


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
    const team = (await User.findById(userId)).team
    return await Group.create({
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
    return await Group.findOneAndUpdate(
      { _id: id },
      { $push: { users: { $each: users } } },
      { new: true }
    )
  },
}

module.exports = { GroupMutation }
