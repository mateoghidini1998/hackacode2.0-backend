const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Service = require('../models/Service.model');

const { 
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    softDeleteService
} = require('../controllers/services');

router.get('/', advancedResults(Service), getServices);
router.get('/:id', getService);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.put('/softdelete/:id', softDeleteService);

module.exports = router;