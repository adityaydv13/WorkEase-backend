 
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
//     // const CLIENT_URL = process.env.REACT_APP_BACKEND_URL ;


//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

//     user.resetToken = token;
//     user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//     // console.log('Email User:', process.env.FRONTEND_URL);
//     const link = `${CLIENT_URL}/reset-password/${token}`;
         
//     await transporter.sendMail({
//       from: 'no-reply@workora.com',
//       to: user.email,
//       subject: 'Password Reset - Workora',
//       html: `<p>Click the link to reset your password:</p><a href="${link}">${link}</a>`,
//     });


//     res.json({ msg: 'Reset link sent to email' });
//   } catch (err) {
//     console.error('Forgot Password Error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  const FRONTEND_URL = process.env.FRONTEND_URL; // Use the correct variable
  console.log('FRONTEND_URL:', FRONTEND_URL);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Use FRONTEND_URL here
    const link = `${FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: 'no-reply@workora.com',
      to: user.email,
      subject: 'Password Reset - Workora',
      html: `<p>Click the link to reset your password:</p><a href="${link}">${link}</a>`,
    });

    res.json({ msg: 'Reset link sent to email' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};