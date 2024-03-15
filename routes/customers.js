const express = require('express');
const router = express.Router();

const {
    getCustomers, 
    getCustomer,
    deleteCustomer,
    createCustomer,
    updateCustomer
} = require('../controllers/customers');
const advancedResults = require('../middleware/advancedResults');
const Customer = require('../models/Customer.model');

router.get('/', advancedResults(Customer), getCustomers);
router.get('/:id', getCustomer);
router.delete('/:id', deleteCustomer);
router.post('/create', createCustomer)
router.put('/:id', updateCustomer);

module.exports = router;