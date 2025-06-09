const mongoose = require('mongoose');

const hireSchema = new mongoose.Schema({
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    hireDate: { type: Date, default: Date.now },
    });

const Hire = mongoose.model('Hire', hireSchema);
module.exports = Hire;