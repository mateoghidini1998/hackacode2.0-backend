const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Service = require('../models/Service.model');
const { protect } = require('../middleware/auth');

const { 
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    softDeleteService
} = require('../controllers/services');

router.get('/', protect, advancedResults(Service), getServices);
router.get('/:id', protect, getService);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.put('/softdelete/:id', protect, softDeleteService);

module.exports = router;