const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


function createModel(name, schema) {
  return mongoose.model(name, new Schema(schema, {
    timestamps: true
  }))
}

const Folder = createModel('Folder', {
  name: String,
  descriptions: String,
  shareWith: [{
    kind: String,
    item: { type: ObjectId, refPath: 'shareWith.kind' }
  }],
  parent: { type: ObjectId, ref: 'Folder' }
})

module.exports.Folder = Folder

module.exports.Team = Folder.discriminator('Team', new Schema({}, {
  timestamps: true
}))

module.exports.User = createModel('User', {
  name: {
    type: String,
    default: ''
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    require: true
  },
  password: String,
  jobTitle: {
    type: String,
    default: ''
  },
  evatarColor: String,
  team: { type: ObjectId, ref: 'Team' },
  role: String,
  status: String
})



module.exports.Group = createModel('Group', {
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
})
