const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true
  },
  jobTitle: {
    type: String,
    default: ''
  },
  avatarColor: String,
  team: { type: ObjectId, ref: 'Team' },
  role: String,
  status: String
})

module.exports = mongoose.model('User', UserSchema)
