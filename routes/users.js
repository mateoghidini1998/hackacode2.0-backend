const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

const {
    getUsers
} = require('../controllers/users');

router.get('/', advancedResults(User), getUsers);

module.exports = router;