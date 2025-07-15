const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/authorised');
const respondToRequest = require('../controllers/respondToRequest');
router.post('/hire/:workerId',authMiddleware, searchController.hireWorker);
    
router.patch('/hire/respond/:id', authMiddleware, respondToRequest.respondToHireRequest);

router.get('/hire/requests/:workerId', respondToRequest.getRequestsForWorker);

module.exports = router;