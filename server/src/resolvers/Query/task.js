const { getUserId } = require('../../utils')
const TaskSchema = require('../../models/task')
const { populateTask } = require('../../helper')

const TaskQuery = {
  /**
   * Method to get all the tasks and sub-tasks
   *
   * @param {*} _
   * @param {String} { parent, folder }
   * @param {Object} context
   * @returns Array
   */
  async getTasks(_, { parent, folder }, context) {
    // if the main task contains subtask
    if (parent) {
      return await populateTask(TaskSchema.find({ parent })).sort({ createdAt: 1 })
    } else {
      return await populateTask(Task.find({ folders: folder })).sort({ createdAt: -1 })
    }
  },
  /**
   * Method to get a single task
   *
   * @param {*} _
   * @param {String} { id }
   * @param {Object} context
   * @returns Object
   */
  async getTask(_, { id }, context) {
    const userId = getUserId(context)
    const task = await populateTask(TaskSchema.findById(id))
    if (!task) {
      throw new Error('Task with that id does not exist')
    }
    return task
  }
}

module.exports = {
  TaskQuery
}
