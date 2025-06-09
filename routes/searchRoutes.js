const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/authorised');
// Route to search for workers
router.get('/workers', searchController.searchWorkers);

// route to delete a worker
router.delete('/hires/:id', authMiddleware,  searchController.deleteHiredWorker);

// Route to get all workers

router.get('/hires', authMiddleware, searchController.getUserHires);

module.exports = router;