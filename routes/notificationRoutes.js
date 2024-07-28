const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController')
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', authMiddleware, notificationController.getNotification);
router.post('/', authMiddleware, adminMiddleware, notificationController.createNotification);

module.exports = router;