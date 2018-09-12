const { getUserId } = require('../utils')
const UserSchema = require('../user/user.model')
const FolderSchema = require('../folder/folder.model')
const TaskSchema = require('../task/task.model')


/**
 * Method to return all the folder that user have shared
 * with others
 *
 * @param {Object} context
 * @param {String} parent
 * @param {String} name
 * @param {String} shareWith
 * @returns Array
 */
async function folderCommon(context, parent, name, shareWith) {
  const userId = getUserId(context)
  return {
    name,
    parent: parent || undefined,
    shareWith: shareWith.concat(parent ? [] : [{
      kind: 'Team',
      item: (await UserSchema.findById(userId)).team
    }])
  }
}

/**
 * Helper function to delete a folder that contains
 * subfolders
 *
 * @param {String} id
 */
async function deleteSubfolders(id) {
  const folders = await FolderSchema.find({parent: id})
  for (const folder of folders) {
    await deleteSubfolders(folder.id)
    await FolderSchema.deleteOne({_id: folder.id})
  }
}
/**
 * Helper function to create task
 *
 * @param {*} promise
 * @returns Object
 */
function populateTask(promise) {
  return promise
    .populate('folders', 'name')
    .populate('parent', 'name')
    .populate('assignees', 'name email firstname lastname avatarColor')
    .populate('creator', 'name, email, firstname, lastname')
}
/**
 * Helper function delete a subtask if
 * an main task contains a task
 *
 * @param {String} id
 */
async function deleteSubTask(id) {
  const tasks = await TaskSchema.find({ parent : id})
  for (const task of tasks ) {
    await deleteSubTask(task.id)
    await TaskSchema.deleteOne({ _id: task.id })
  }
}

module.exports = {
  folderCommon,
  deleteSubfolders,
  populateTask,
  deleteSubTask
}
