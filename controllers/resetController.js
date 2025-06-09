const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
 const bcrypt = require('bcryptjs');


exports.ResetPassword= async (req, res) => {
    //  console.log(req.params);
  const { token } = req.params;
  console.log(token);
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Reset failed' });
  }
}
