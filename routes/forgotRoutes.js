const express = require('express');
const router = express.Router();

const forgotController = require('../controllers/forgotController');
const resetController = require('../controllers/resetController');
 // handle forgot 
router.post('/forgot-password', forgotController.forgotPassword);

// handle reset
// Example Express route setup
router.post('/reset-password/:token', resetController.ResetPassword);

module.exports = router;