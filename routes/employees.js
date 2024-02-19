const express = require('express');
const router = express.Router();

const {
    createEmployee
} = require('../controllers/employees');

router.post('/create', createEmployee);

module.exports = router;