const express = require('express');
const router = express.Router();

const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
} = require('../controllers/employees');

router.post('/create', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', updateEmployee);

module.exports = router;