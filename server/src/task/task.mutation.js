const TaskSchema = require('./task.model')
const { getUserId } = require('../utils')
const { populateTask, deleteSubTask } = require('../helper')

const TaskMutation = {
  /**
   * Method to create a task
   *
   * @param {*} _
   * @param {String} { folder, parent, name }
   * @param {Object} context
   * @returns Object
   */
  async createTask(_, { folder, parent, name, description}, context) {
    const userId = getUserId(context)
    const task = await TaskSchema.create({
      name,
      description,
      parent,
      folder: folder ? [folder] : [],
      creator: userId
    })
    return await populateTask(TaskSchema.findById(task.id))
  },

  /**
   * Method to update a single task
   *
   * @param {*} _
   * @param { String } {id, input}
   * @param { Object } context
   * @returns Object
   */
  async updateTask(_, {id, input}, context ) {
    const userId = getUserId(context)
    return await populateTask(TaskSchema.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true },
    ))
  },

  /**
   *  Method to delete a task
   *
   * @param {*} _
   * @param {String} { id }
   * @param {Object} context
   */
  async deleteTask(_, { id }, context) {
    const userId = getUserId(context)
    await TaskSchema.deleteOne({ _id: id })
    deleteSubTask(id)
    return true
  }
}

module.exports = {
  TaskMutation
}
