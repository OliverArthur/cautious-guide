const { GraphQLScalarType } = require('graphql')
const { User, Team, Folder, Group } = require('../../models')

const { getUserId } = require('./utils')
const { welcomeEmail, invitationEmail, notificationNewUser } = require('../../emails')
const { Transporter } = require('../../config/transporter')
const JWT_SECRET = process.env.JWT_SECRET

const User = {
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
    const isEmailUsed = await User.findOne({email})

    if (isEmailUsed) {
      throw new Error('This email is already taken')
    }

    const user = await User.create({
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
    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, JWT_SECRET, { expiresIn: '8h' })
    return { token, user}
  },
}


module.exports = { User }
