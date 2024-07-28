const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

// Route for voting
router.post('/', authMiddleware, userMiddleware, voteController.voteForCandidate);
module.exports = router;