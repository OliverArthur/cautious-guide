const url = process.env.CLIENT_URL
const fromEmail = process.env.FROM_EMAIL

module.exports.invitationEmail = function (email, user, thisUser) {
  const text = `
  Hi,
  Please accept this invite to nardi, our tool for work management and collaboration.
  Using nardi, we plan and track projects,
  discuss ideas, and collaborate to get work done.
  Accept invitation\n
  ${url}/signup/${user.id}
  Decline invitation\n
  ${url}/decline/${user.id}
  All the best,
  ${thisUser.name}`

  return {
    to: `${email}`,
    from: {
      address: fromEmail,
      name: `${thisUser.name} at nardi`
    },
    subject: 'Invitation to nardi',
    text
  }
}

module.exports.welcomeEmail = function (email, user) {
  const text = `
  Hi,
  Thank you for choosing nardi!
  You are just one click away from completing your account registration.
  Confirm your email:\n
  ${url}/signup/${user.id}`

  return {
    to: `${email}`,
    from: {
      address: fromEmail,
      name: 'nardi'
    },
    subject: 'Please complete your registration',
    text
  }
}

module.exports.notificationNewUser = function (email, user) {
  const text = `New user: ${email}`

  return {
    to: fromEmail,
    from: {
      address: fromEmail,
      name: 'nardi'
    },
    subject: 'New user on nardi',
    text
  }
}
