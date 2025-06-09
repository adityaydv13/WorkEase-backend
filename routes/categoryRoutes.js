const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authorised');
const workerController = require('../controllers/workerController');
 // Route to get all categories
router.get('/category/:categoryName',authMiddleware, workerController.getCategories);

module.exports = router;