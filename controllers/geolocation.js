const express = require('express');
// const router = express.Router();
const Worker = require('../models/worker');

// GET nearby workers based on lat/lng
exports.geolocation= async (req, res) => {
  const { lat, lng, category } = req.query;

  if (!lat || !lng) return res.status(400).json({ message: 'lat and lng required' });

  try {
    const workers = await Worker.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 30000, // 10 km
        },
      },
      ...(category && { category }),
    });

    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// module.exports = router;
