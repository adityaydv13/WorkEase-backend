 

const mongoose = require('mongoose');
const Worker = require('../models/worker');

exports.getMe = async (req, res) => {
  try {
    const workers = await Worker.find({ userId: req.user.id });
    if (!workers || workers.length === 0) {
      return res.status(404).json({ message: 'No workers found' });
    }
    res.json(workers); // Return an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    const workerId = req.params.workerId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    // Check if the worker belongs to this user
    const worker = await Worker.findOne({ _id: workerId, userId });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found or not authorized' });
    }

    await Worker.deleteOne({ _id: workerId });
    res.json({ message: 'Worker deleted successfully' });
  } catch (error) {
    console.error('Error deleting worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
