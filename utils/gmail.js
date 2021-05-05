const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const user = `${process.env.email}`;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: `${process.env.email}`,
    pass: `${process.env.password}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  noTifyToAdmin: (admin_email, que_title, question) => {
    const options = {
      from: `mini-q2a - UDPT04 - API Service - ${user}`,
      to: `${admin_email}`,
      subject: `Question ${que_title} was accepted!`,
      text: `Question ${que_title} was accepted!\nQuestion Accepted Information\n${JSON.stringify(
        question
      )}`,
    };

    transporter.sendMail(options, (er, info) => {
      if (er) console.log(er);
      else console.log(info);
    });
  },

  notifyAnswerToAdmin: (admin_email, number, answer) => {
    const options = {
      from: `mini-q2a - UDPT04 - API Service - ${user}`,
      to: `${admin_email}`,
      subject: `There are ${number} answer was accepted!`,
      text: `There are ${number} answer was accepted!\nAnswer accepted information\n${JSON.stringify(
        answer
      )}`,
    };

    transporter.sendMail(options, (er, info) => {
      if (er) console.log(er);
      else console.log(info);
    });
  },
};
