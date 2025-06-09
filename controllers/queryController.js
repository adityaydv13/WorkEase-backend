 
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.SendQuery = async (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,      // Gmail address
      pass: process.env.EMAIL_PASS,      // Gmail App Password (NOT your real Gmail password)
    },
    tls: {
      rejectUnauthorized: false, // allows self-signed certs (use only in development)
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New Query from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Query sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send query' });
  }
};
