const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authorised');
const workerController = require('../controllers/workerController');

// Route to add a new worker
router.post('/addworker',authMiddleware, workerController.workerRegister);


module.exports = router;