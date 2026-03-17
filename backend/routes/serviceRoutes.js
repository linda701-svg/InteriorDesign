const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getServices,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

router.route('/')
    .get(getServices)
    .post(protect, createService);

router.route('/:id')
    .put(protect, updateService)
    .delete(protect, deleteService);

module.exports = router;
