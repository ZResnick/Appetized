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
      html: `<h4>Thank you for using Appetized to manage your recipes!</h4>
      <p>Please find your grovery list below.</p>
      ${ings
        .map(ing => {
          return `<input type="checkbox">${ing.title}<br>`
        })
        .join('')}`
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
