const { GraphQLScalarType } = require('graphql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const nodeMailer = require('nodemailer')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { User, Team, Folder, Group } = require('./models')

const { getUserId } = require('./utils')

const { welcomeEmail, invitationEmail, notificationNewUser } = require('./emails')

const JWT_SECRET = process.env.JWT_SECRET

const transporter = nodeMailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true
})

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())]
}

const avatarColors = [
  "D81B60","F06292","F48FB1","FFB74D","FF9800","F57C00","00897B","4DB6AC","80CBC4",
  "80DEEA","4DD0E1","00ACC1","9FA8DA","7986CB","3949AB","8E24AA","BA68C8","CE93D8"
]

async function deleteSubfolders(id) {
  const folders = await Folder.find({parent: id})
  for (const folder of folders) {
    await deleteSubfolders(folder.id)
    await Folder.deleteOne({_id: folder.id})
  }
}

const resolvers = {
  Query: {
    async getTeam(_, args, context) {
      const userId = getUserId(context)
      const user = await User.findById(userId)
      return await Team.findById(user.team)
    },
    async getGroups (_, args, context) {
      const userId = getUserId(context)
      const team = (await User.findById(userId)).team
      return await Group.find({team}).sort({ createdAt: -1 })
      return group
    },
    async getGroup (_, {id}, context) {
      const userId = getUserId(context)
      const group = await Group.findById(id).populate('users')
      return group
    },
    async getFolders (_, {parent}, context) {
      const userId = getUserId(context)
      if (parent) {
        return await Folder.find({parent})
      } else {
        const user = await User.findById(userId)
        const groups = await Group.find({users: ObjectId(userId)}, '_id')
        const ids = groups.map(o => o._id).concat(
          ['External User', 'Collaborator'].includes(user.role)
          ? [ObjectId(userId)]
          : [ObjectId(userId), user.team]
        )
        return await Folder.find({ 'shareWith.item': ids }).populate('shareWith')
      }
    },

    async getFolder (_, {id}, context) {
      const userId = getUserId(context)
      return await Folder.findById(id).populate('shareWith')
    },

    async getUsers(_, args, context) {
      const userId = getUserId(context)
      const team = (await User.findById(userId)).team
      return await User.find({
        team
      })
    },

    async getUser(_, { id }, context) {
      const userId = getUserId(context)
      return await User.findById(id || userId)
    },
  },

  Mutation: {
    async captureEmail(_, {email}) {
      const isEmailUsed = await User.findOne({email})

      if (isEmailUsed) {
        throw new Error('This email is already taken')
      }

      const user = await User.create({
        email,
        role: 'Owner',
        status: 'Pending'
      })

      transporter.sendMail(welcomeEmail(email, user))
      transporter.sendMail(notificationNewUser(email, user))

      return user
    },

    async signup(_, { id, firstname, lastname, password }){
      const user = await User.findById(id)
      const userDetails = {
        firstname,
        lastname,
        name: `${firstname} ${lastname}`,
        avatarColor: randomChoice(avatarColors),
        password: await bcrypt.hash(password, 10),
        status: 'Active'
      }
      if (user.role === 'Owner') {
        const team = await Team.create({
          name: `${userDetails.name}'s Team`
        })
        user.set({
          ...userDetails,
          team: team.id,
          jobTitle: 'CEO/Owner/Founder'
        })
      } else {
        user.set(userDetails)
      }
      await user.save()
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
      return { token, user}
    },

    async login(_, { email, password }){
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('No user with that email')
      }
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Incorrect password')
      }
      const token = jwt.sign({id: user.id, email}, JWT_SECRET, { expiresIn: '1h' })
      return {token, user}
    },

    async createFolder(_, {parent, name}, context) {
      const userId = getUserId(context)
      const folder = await Folder.create({
        name,
        parent: parent || undefined,
        shareWith: parent ? [] : [{
          kind: 'Team',
          item: (await User.findById(userId)).team
        }]
      })
      return await Folder.findById(folder.id).populate('shareWith.item')
    },

    async updateFolder(_, {id, input}, context) {
      const userId = getUserId(context)
      return await Folder.findOneAndUpdate(
        { _id: id },
        { $set: input },
        { new: true }
      ).populate('shareWith')
    },

    async deleteFolder(_, {id}, context) {
      const userId = getUserId(context)
      await Folder.deleteOne({_id: id})
      deleteSubfolders(id)
      return true
    },
    async invite (_, {emails, groups, role}, context) {
      const userId = getUserId(context)
      const thisUser = await User.findById(userId)
      const team = thisUser.team
      const teamMembers = (await User.find({team}, 'email')).map(o => o.email)
      const users = []
      for (const email of emails) {
        if (teamMembers.includes(email)) {
        } else {
          const user = await User.create({
            email,
            team,
            role,
            status: 'Pending'
          })
          users.push(user)
          transporter.sendMail(invitationEmail(email, user, thisUser))
        }
      }
      const userIds = users.map(o => o.id)
      for (const id of groups) {
        const group = await Group.findById(id)
        group.users = userIds
        await group.save()
      }
      return users
    },
    async updateUser(_, {id, input}, context) {
      const userId = getUserId(context)
      return await User.findOneAndUpdate(
        { _id: id },
        { $set: input },
        { new: true }
      )
    },
    async createGroup (_, {name, initials, avatarColor, users}, context) {
      const userId = getUserId(context)
      const team = (await User.findById(userId)).team
      return await Group.create({
        name,
        team,
        initials,
        avatarColor,
        users
      })
    },
    async addUsersToGroup (_, {id, users}, context) {
      const userId = getUserId(context)
      return await Group.findOneAndUpdate(
        { _id: id },
        { $push: { users: { $each: users } } },
        { new: true }
      )
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value) => moment(value).toDate(),
    serialize: (value) => value.getTime(),
    parseLiteral: (ast) => ast
  })
}
module.exports = resolvers
