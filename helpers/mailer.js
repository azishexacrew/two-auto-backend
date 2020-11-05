const nodemailer = require("nodemailer");

const sendMail = (mailOptions, sender = null) => {
  const defaultSender = "2-auto Admin <postmaster@mg.2-auto.id>";
  // override sender
  if (sender) {
    mailOptions.from = sender;
  } else {
    mailOptions.from = defaultSender;
  }

  const transporter = nodemailer.createTransport({
    service: "mailgun",
    auth: {
      user: "postmaster@mg.2-auto.id",
      pass: "a34a849daa9554104320a17e4767c00e-c8c889c9-a267632e"
    }
  });

  transporter.sendMail(mailOptions, console.log);
};

module.exports = {
    sendMail
};
