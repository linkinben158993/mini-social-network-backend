const nodemailer = require("nodemailer");
const dotenv = require('dotenv');


dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  noTifyToAdmin: (admin_email, que_title, quetion_or_answer) => {
    const options = {
      from: `mini-q2a - UDPT04 - API Service - ${user}`,
      to: `${admin_email}`,
      subject: `Question ${que_title} was accepted!`,
      text: `Question Accepted Information\n${JSON.stringify(
        quetion_or_answer
      )}`,
    };

    transporter.sendMail(options, (er, info) => {
      if (er) console.log(er);
      else console.log(info);
    });
  },
};
