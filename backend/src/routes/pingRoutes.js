const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/ping (protected route - requires authentication)
router.get('/', authenticateToken, ping);

module.exports = router;
