const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
// Admin routes for managing candidates
router.post('/', authMiddleware, adminMiddleware, candidateController.createCandidate);
router.get('/', candidateController.getCandidate);
router.put('/:id', authMiddleware, adminMiddleware, candidateController.updateCandidate);
router.delete('/:id', authMiddleware, adminMiddleware, candidateController.deleteCandidate);

module.exports = router;
