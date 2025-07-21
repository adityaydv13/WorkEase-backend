 
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  address: String,
  workertype: String,
  availability: String,
  status: String,

location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },


});
// workerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Worker', workerSchema);
