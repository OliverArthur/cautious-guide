const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.set('useCreateIndex', true)

const GroupSchema = new mongoose.Schema({
  team: {
    type: ObjectId,
    ref: 'Team'
  },
  name: String,
  initials: String,
  avatarColor: String,
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema)
