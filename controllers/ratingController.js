const Worker = require('../models/worker');
const Hire = require('../models/hire');
exports.rateWorker = async (req, res) => {
  try {
    const { stars } = req.body;
    const workerId = req.params.id;
    const userId = req.user.id;

    if (stars < 1 || stars > 5) {
      return res.status(400).json({ error: 'Stars must be between 1 and 5' });
    }

    const worker = await Worker.findById(workerId);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    const hire = await Hire.findOne({ workerId, userId, status: 'accepted' });
    if (!hire) return res.status(403).json({ error: 'You can only rate a worker you’ve hired and was accepted.' });

    const existingRating = worker.ratings.details.find(r => r.userId.toString() === userId);

    if (existingRating) {
      // Update existing rating
      worker.ratings.totalStars = worker.ratings.totalStars - existingRating.stars + stars;
      existingRating.stars = stars;
    } else {
      // New rating
      worker.ratings.details.push({ userId, stars });
      worker.ratings.totalStars += stars;
      worker.ratings.numberOfRatings += 1;
    }

    await worker.save();
    res.json({ message: 'Rating saved successfully' });

  } catch (error) {
    console.error('Error in rateWorker:', error);
    res.status(500).json({ error: 'Server error while saving rating' });
  }
};

exports.getUserRating = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({});

    const rating = worker.ratings.details.find(r => r.userId.toString() === req.query.userId);
    res.send(rating || {});
  } catch (error) {
    console.error('Error in getUserRating:', error);
    res.status(500).json({ error: 'Server error while fetching rating' });
  }
};
