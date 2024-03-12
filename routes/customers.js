const express = require('express');
const router = express.Router();

const {
    getCustomers, 
    getCustomer,
    deleteCustomer,
    createCustomer,
    updateCustomer
} = require('../controllers/customers');

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.delete('/:id', deleteCustomer);
router.post('/create', createCustomer)
router.put('/:id', updateCustomer);

module.exports = router;