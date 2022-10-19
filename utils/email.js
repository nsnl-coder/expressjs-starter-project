const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  const { to, subject, text } = options

  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    // active in gmail "less secure app" option
  })

  // 2) Define an email options
  const mailOptions = {
    from: 'NSNL <HELLO@GMAIL.COM>',
    to,
    subject,
    text,
    // html:
  }

  // 3) Actually send the email with nodemailer
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
