const nodemailer = require("nodemailer");

exports.send = (mailOptions) => {
  // Create transport
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Send mail
  return transport.sendMail({
    from: process.env.MAIL_FROM,
    to: mailOptions?.to,
    subject: mailOptions?.subject || "Example Subject",
    text: mailOptions?.text || "Example text",
    html: mailOptions?.html,
  });
};
