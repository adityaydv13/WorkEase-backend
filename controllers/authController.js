const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('../routes/categoryRoutes');
// const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  

  const { name, email, password } = req.body;

   const profileImage = req.file ? `${process.env.REACT_APP_BACKEND_URL}/uploads/${req.file.filename}` : '';

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage
    }); 
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials or User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials ' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user deletion 

exports.UserDelete =  ('/delete', async (req, res) => {
 try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

exports.updateProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.file) {
      return res.status(400).json({ msg: 'No image file uploaded' });
    }

    const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Profile image updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
