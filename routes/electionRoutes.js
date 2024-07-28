const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', authMiddleware, electionController.getElectionResult);
router.post('/create', authMiddleware, adminMiddleware, electionController.createElection)
module.exports = router;