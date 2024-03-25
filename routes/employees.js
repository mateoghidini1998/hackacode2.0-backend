const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Employee = require('../models/Employee.model');
const { protect } = require('../middleware/auth');

const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    softDeleteEmployee,
    getEmployeeByUserId

} = require('../controllers/employees');

router.post('/create', protect, createEmployee);
router.get('/', protect, advancedResults(Employee), getEmployees);
router.get('/:id', protect, getEmployee);
router.get('/user/:user_id', protect, getEmployeeByUserId)
router.delete('/:id', protect, deleteEmployee);
router.put('/:id', protect, updateEmployee);
router.put('/softdelete/:id', protect, softDeleteEmployee);


module.exports = router;