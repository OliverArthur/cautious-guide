const nodeMailer = require('nodemailer')

const Transporter = nodeMailer.createTransport({
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

module.exports = { Transporter }
