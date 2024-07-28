const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const twoFactorMiddleware = require('../middlewares/twoFactorMiddleware');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/change-password', authMiddleware, authController.changePassword)
router.post('/verifyOtp', authController.verifyLoginOTP);

module.exports = router;