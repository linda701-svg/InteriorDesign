const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/statsController');

router.get('/dashboard', protect, getDashboardStats);

module.exports = router;
