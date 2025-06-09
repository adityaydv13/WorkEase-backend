//  user model 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },

   profileImage: {
    type: String,
    default: '' // Or a default URL
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
