const Transporter = require('./Nodemailer');

module.exports = (ctx) => {
  return {
    Transporter: Transporter(ctx),
  }
}
