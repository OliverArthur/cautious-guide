const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const FolderSchema = require('./folder')

mongoose.set('useCreateIndex', true)

const TeamSchema = FolderSchema.discriminator('Team', new Schema({
  _id: ObjectId
}, {
  timestamps: true
}))

module.exports = mongoose.model('Team')

module.exports.TeamSchema = TeamSchema
