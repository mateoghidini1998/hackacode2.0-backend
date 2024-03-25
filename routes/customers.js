const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Customer = require('../models/Customer.model');
const { protect } = require('../middleware/auth');

const {
    getCustomers, 
    getCustomer,
    deleteCustomer,
    createCustomer,
    updateCustomer,
    softDeleteCustomer
} = require('../controllers/customers');

router.get('/', protect, advancedResults(Customer), getCustomers);
router.get('/:id', protect, getCustomer);
router.delete('/:id', protect, deleteCustomer);
router.post('/create', protect, createCustomer)
router.put('/:id', protect, updateCustomer);
router.put('/softdelete/:id', protect, softDeleteCustomer);

module.exports = router;