const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.set('useCreateIndex', true)

const TaskSchema = new mongoose.Schema({
  folders: [{ type: ObjectId, ref: 'Folder' }],
  parent: { type: ObjectId, ref: 'Task' },
  assignees: [{ type: ObjectId, ref: 'User' }],
  name: String,
  description: { type: String, default: '' },
  creator: { type: ObjectId, ref: 'User' },
  startDate: { type: Date },
  finishDate: { type: Date },
  duration: { type: Number },
  status: { type: String, default: 'New' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema)
