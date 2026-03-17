const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');

router.route('/')
    .get(protect, getInquiries)
    .post(createInquiry);

router.route('/:id')
    .delete(protect, deleteInquiry);

module.exports = router;

