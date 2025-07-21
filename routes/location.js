const express = require('express');
const router = express.Router();

// const authMiddleware = require('../middleware/authorised');
const geolocationController = require('../controllers/geolocation');    
router.get('/nearby', geolocationController.geolocation);

module.exports=router;