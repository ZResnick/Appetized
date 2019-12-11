const nodemailer = require('nodemailer')

module.exports = {
  emailConfirmation: function(email, ings) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'appetizedrecipemanager@gmail.com',
        pass: 'Goat7693'
      }
    })
    const mailOptions = {
      from: 'AppetizedRecipeManager@gmail.com',
      to: String(email),
      subject: `Appetized Grocery List`,
      html: `<ul>
      ${ings.map(ing => `<li>${ing.title}</li>`)}
    </ul>`
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

//user 1 should only be able to see user 1's cart
