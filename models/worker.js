 
// const mongoose = require('mongoose');

// const workerSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: String,
//   phone: String,
//   address: String,
//   workertype: String,
//   availability: String,
//   status: String,

// location: {
//     type: { type: String, enum: ['Point'], default: 'Point' },
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       required: true,
//     },
//   },


// });
// workerSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('Worker', workerSchema);



 
const mongoose = require('mongoose');

const ratingDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false // multiple workers can be rated by same user
  },
  stars: {
    type: Number,
    required: true
  }
}, { _id: false });

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

  //  ratings: {
  //   totalStars: { type: Number, default: 0 },
  //   numberOfRatings: { type: Number, default: 0 },
  //   details: [ratingDetailSchema]
  // }
  // models/worker.js
ratings: {
  totalStars: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  details: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      stars: Number,
    }
  ]
}



});
workerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Worker', workerSchema);
