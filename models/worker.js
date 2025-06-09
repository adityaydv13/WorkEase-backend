 
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  address: String,
  workertype: String,
  availability: String,
  status: String,
});

module.exports = mongoose.model('Worker', workerSchema);
