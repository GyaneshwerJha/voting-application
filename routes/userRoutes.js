const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

router.get('/profile', authMiddleware, userMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userMiddleware, userController.updateProfile);
router.get('/voting-history', authMiddleware, userMiddleware, userController.getVotingHistory);
module.exports = router;