const UserSchema = require('../../models/user')
const FolderSchema = require('../../models/folder')
const { getUserId } = require('../../utils')
const { deleteSubfolders } = require('../../helper')

const FolderMutation = {
  /**
   * Method will use to create a folder which
   * will be only visible for a member of the team or
   * any user which has been shared.
   *
   * @param {*} _
   * @param {Object} {parent, name}
   * @param {Obejct} context
   * @returns will return the folder Object
   */
  async createFolder(_, {parent, name}, context) {
    const userId = getUserId(context)
    const folder = await FolderSchema.create({
      name,
      parent: parent || undefined,
      shareWith: parent ? [] : [{
        kind: 'Team',
        item: (await UserSchema.findById(userId)).team
      }]
    })
    return await FolderSchema.findById(folder.id).populate('shareWith.item')
  },
  /**
   * Method to update a single folder and only
   * person with right permision can update the a
   * folder.
   *
   * @param {*} _
   * @param {String, Object} {id, input}
   * @param {Object} context
   * @returns will return the folder Object
   */
  async updateFolder(_, {id, input}, context) {
    const userId = getUserId(context)
    return await FolderSchema.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true }
    ).populate('shareWith')
  },
  /**
   *
   *
   * @param {*} _
   * @param {String} {id}
   * @param {Object} context
   * @returns Boolean
   */
  async deleteFolder(_, {id}, context) {
    const userId = getUserId(context)
    await FolderSchema.deleteOne({_id: id})
    deleteSubfolders(id)
    return true
  },
}

module.exports = { FolderMutation }
