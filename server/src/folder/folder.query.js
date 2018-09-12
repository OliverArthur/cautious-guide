const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const UserSchema = require('../user/user.model')
const FolderSchema = require('../folder/folder.model')
const GroupSchema = require('../group/group.model')
const { getUserId } = require('../utils')

const FolderQuery = {
   /**
   * Method to get all the folders and sub-folders
   *
   * @param {*} _
   * @param {Array} parent
   * @param {Object} context
   */
  async getFolders (_, {parent}, context) {
    const userId = getUserId(context)
    if (parent) {
      return await FolderSchema.find({parent})
    } else {
      const user = await UserSchema.findById(userId)
      const groups = await GroupSchema.find({users: ObjectId(userId)}, '_id')
      const ids = groups.map(o => o._id).concat(
        ['External User', 'Collaborator'].includes(user.role)
        ? [ObjectId(userId)]
        : [ObjectId(userId), user.team]
      )
      return await FolderSchema.find({ 'shareWith.item': ids }).populate('shareWith')
    }
  },
  /**
   * Method to get a single folder
   *
   * @param {*} _
   * @param {String} {id}
   * @param {Object} context
   * @returns
   */
  async getFolder (_, {id}, context) {
    const userId = getUserId(context)
    return await FolderSchema.findById(id).populate('shareWith')
  },
}

module.exports = { FolderQuery }
