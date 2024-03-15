const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Employee = require('../models/Employee.model');

const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
} = require('../controllers/employees');

router.post('/create', createEmployee);
router.get('/', advancedResults(Employee), getEmployees);
router.get('/:id', getEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', updateEmployee);

module.exports = router;