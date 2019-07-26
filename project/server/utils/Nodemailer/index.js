const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = (ctx) => {
  if (!ctx.log) throw '!log'
  
  const transporter = nodemailer.createTransport(smtpTransport(ctx.config.mail.smtp));
  return  transporter;
}
