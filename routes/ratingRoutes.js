const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorised');
const { rateWorker, getUserRating } = require('../controllers/ratingController');

router.post('/:id/rate', auth, rateWorker);
router.get('/:id/my-rating', getUserRating); // optional: can protect with auth if needed

module.exports = router;
