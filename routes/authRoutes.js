const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authorised');
const upload = require('../middleware/upload');
const { updateProfileImage } = require('../controllers/authController');

const queryContoller = require('../controllers/queryController');
// router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/delete',authMiddleware, authController.UserDelete);
// for profileimage upload and register
router.post('/register', upload.single('profileImage'), authController.register);

// update profile image route 
router.put('/update-profile-image/:userId', upload.single('profileImage'), updateProfileImage);

// query
router.post('/', queryContoller.SendQuery);

module.exports = router;
