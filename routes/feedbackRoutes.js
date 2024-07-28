const express = require('express');
const router = express.Router();
const provideFeedback = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
router.post('/', authMiddleware, userMiddleware, provideFeedback.provideFeedback);
router.get('/', authMiddleware, adminMiddleware, provideFeedback.getFeedback);
module.exports = router;