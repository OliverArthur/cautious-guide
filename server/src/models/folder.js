const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.set('useCreateIndex', true)

const FolderSchema = new mongoose.Schema({
  name: String,
  descriptions: String,
  shareWith: [{
    kind: String,
    item: { type: ObjectId, refPath: 'shareWith.kind' }
  }],
  parent: { type: ObjectId, ref: 'Folder' }

}, { timestamps: true });

module.exports = mongoose.model('Folder', FolderSchema)
