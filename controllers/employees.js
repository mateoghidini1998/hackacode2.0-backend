const Employee = require('../models/Employee.model');
const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//@route POST /api/v1/employees
//@desc Create new employee
//@access Private

exports.createEmployee = asyncHandler(async (req, res, next) => {

    const { user_id, name, lastname, address, dni, birthdate, country, phone, position, salary } = req.body;

    const repeatedEmployee = await Employee.findOne({ where: { user_id } });

    const user = await User.findByPk(user_id);

    if(!user){
        return next(new ErrorResponse(`User with id: ${user_id} does not exist`, 404));
    }

    if(repeatedEmployee){
        return next(new ErrorResponse(`Employee with id: ${user_id} already exists`, 400));
    }

    const employee = await Employee.create({ user_id, name, lastname, address, dni, birthdate, country, phone, position, salary });

    return res.status(200).json({ employee });

});


//@route GET /api/v1/employees
//@desc Get all employees
//@access Private

exports.getEmployees = asyncHandler(async (req, res, next) => {
    const employees = await Employee.findAll();
    return res.status(200).json({ employees }); 
});

//@route GET /api/v1/employees/:id
//@desc Get employee by id
//@access Private

exports.getEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);
    return res.status(200).json({ employee });
});

//@route PUT /api/v1/employees/:id
//@desc Update employee by id
//@access Private

exports.updateEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);
    await employee.update(req.body);
    return res.status(200).json({ employee });
});

//@route DELETE /api/v1/employees/:id
//@desc Delete employee by id
//@access Private

exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);
    await employee.destroy();
    return res.status(200).json({ msg: `Employee with ${req.params.id} was deleted` }); 
});