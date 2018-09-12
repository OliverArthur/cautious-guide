const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = require('./user.model')
const TeamSchema = require('../team/team.model')
const GroupSchema = require('../group/group.model')

const {randomChoice, avatarColors} = require('../helper/avatar')
const { getUserId } = require('../utils')
const { welcomeEmail, invitationEmail, notificationNewUser } = require('../emails')
const { Transporter } = require('../config/transporter')
const JWT_SECRET = process.env.JWT_SECRET

const UserMutation = {
  /**
   * Method to send an email to allow an user
   * to be register in the system. This method
   * will capture the email of the user and then
   * is sending an email with the link to go the
   * registration form.
   *
   * @param {*} _
   * @param {String} {email}
   * @returns Object
   */
  async captureEmail(_, {email}) {
    const isEmailUsed = await UserSchema.findOne({email})

    if (isEmailUsed) {
      throw new Error('This email is already taken')
    }

    const user = await UserSchema.create({
      email,
      role: 'Owner',
      status: 'Pending'
    })

    Transporter.sendMail(welcomeEmail(email, user))
    Transporter.sendMail(notificationNewUser(email, user))

    return user
  },
  /**
   * Method to register a new user, this method can be trigger
   * when the user get the email registration and fill the signup form
   * or if get invitation from another existing user in the system.
   *
   * @param {*} _
   * @param {Sting} { id, firstname, lastname, password }
   * @returns Object
   */
  async signup(_, { id, firstname, lastname, password }){
    const user = await UserSchema.findById(id)
    const userDetails = {
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      avatarColor: randomChoice(avatarColors),
      password: await bcrypt.hash(password, 10),
      status: 'Active'
    }
    if (user.role === 'Owner') {
      const team = await TeamSchema.create({
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
    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, JWT_SECRET, { expiresIn: '8h' })
    return { token, user}
  },

  /**
   * Method to authenticate an user
   *
   * @param {*} _
   * @param {String} { email, password }
   * @returns String
   */
  async login(_, { email, password }){
    const user = await UserSchema.findOne({ email })
    if (!user) {
      throw new Error('No user with that email')
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Incorrect password')
    }
    const token = jwt.sign({id: user.id, email}, JWT_SECRET, { expiresIn: '8h' })
    return {token, user}
  },
  /**
   * Method allow authenticate user to invite
   * another user to the team
   *
   * @param {*} _
   * @param {String} {emails, groups, role}
   * @param {Object} context
   * @returns Object
   */
  async invite (_, {emails, groups, role}, context) {
    const userId = getUserId(context)
    const thisUser = await UserSchema.findById(userId)
    const team = thisUser.team
    const teamMembers = (await UserSchema.find({team}, 'email')).map(o => o.email)
    const users = []
    for (const email of emails) {
      if (teamMembers.includes(email)) {
      } else {
        const user = await UserSchema.create({
          email,
          team,
          role,
          status: 'Pending'
        })
        users.push(user)
        Transporter.sendMail(invitationEmail(email, user, thisUser))
      }
    }
    const userIds = users.map(o => o.id)
    for (const id of groups) {
      const group = await GroupSchema.findById(id)
      group.users = userIds
      await group.save()
    }
    return users
  },
  /**
   * Method to decline an invitation
   *
   * @param {*} _
   * @param {String} {id}
   * @returns Boolean
   */
  async decline (_, {id}) {
    await UserSchema.findOneAndUpdate(
      { _id: id },
      { $set: { status: 'Declined' } },
    )
    return true
  },
  /**
   * Method to allow user to update profile and only
   * admin and the owner of the profile can update profiles.
   *
   * @param {*} _
   * @param {String} {id, input}
   * @param {Object} context
   * @returns Object
   */
  async updateUser(_, {id, input}, context) {
    const userId = getUserId(context)
    return await UserSchema.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true }
    )
  },
  /**
   * Object to delete an account and will be trigger by
   * the owner of the team.
   *
   * @param {*} _
   * @param {String} {id}
   * @param {Object} context
   * @returns Boolean
   */
  async deleteUser(_, {id}, context) {
    const userId = getUserId(context)
    await User.deleteOne({_id: id})
    return true
  },
}


module.exports = { UserMutation }
