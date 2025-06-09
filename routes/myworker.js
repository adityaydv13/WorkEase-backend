const express = require('express');
const router = express.Router();

const myworkerController = require('../controllers/myworkerController');
const authMiddleware = require('../middleware/authorised');
// Route to get all workers hired by the user   
router.get('/my-worker', authMiddleware, myworkerController.getMe);

// Route to delete a worker hired by the user
router.delete('/:workerId', authMiddleware, myworkerController.deleteMe);

module.exports = router;