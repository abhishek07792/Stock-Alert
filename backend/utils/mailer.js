const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (subject, text ,email) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email ,
    subject,
    text,
  });
};
