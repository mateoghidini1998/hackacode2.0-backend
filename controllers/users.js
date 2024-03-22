const User = require('../models/User.model');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@route GET api/v1/users
//@desc Get all users
//@access Public

exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});