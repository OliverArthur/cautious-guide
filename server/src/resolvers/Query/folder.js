const { User, Folder, Group } = require('../../models')
const { getUserId } = require('../../utils')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

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
      return await Folder.find({parent})
    } else {
      const user = await User.findById(userId)
      const groups = await Group.find({users: ObjectId(userId)}, '_id')
      const ids = groups.map(o => o._id).concat(
        ['External User', 'Collaborator'].includes(user.role)
        ? [ObjectId(userId)]
        : [ObjectId(userId), user.team]
      )
      return await Folder.find({ 'shareWith.item': ids }).populate('shareWith')
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
    return await Folder.findById(id).populate('shareWith')
  },
}

module.exports = { FolderQuery }
