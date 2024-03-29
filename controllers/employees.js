const Employee = require('../models/Employee.model');
const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const advancedResults = require('../middleware/advancedResults');

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
    const employees = await Employee.findAll({
        where: {
            is_active: true
        }
    });
    return res.status(200).json(employees);
});

//@route GET /api/v1/employees/:id
//@desc Get employee by id
//@access Private

exports.getEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);
    if(!employee){
        return next(new ErrorResponse(`Employee with id: ${req.params.id} does not exist`, 404));
    }
    return res.status(200).json({ employee });
});

//@route PUT /api/v1/employees/:id
//@desc Update employee by id
//@access Private

exports.updateEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);
    console.log(employee)
    
    if(!employee){
        return next(new ErrorResponse(`Employee with id: ${req.params.id} does not exist`, 404));
    }
    console.log(req.user)
    
    if(req.user.id != employee.user_id && req.user.role !== 'admin'){
        return next(new ErrorResponse(`User with id: ${req.user.id} is not authorized to update employee with id: ${req.params.id}`, 401));
    } 
    await employee.update(req.body);
    return res.status(200).json({ employee });
});

//@route DELETE /api/v1/employees/:id
//@desc Delete employee by id
//@access Private

exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);

    
    if(!employee){
        return next(new ErrorResponse(`Employee with id: ${req.params.id} does not exist`, 404));
    }
    if(req.user.role !== 'admin'){
        return next(new ErrorResponse(`User with id: ${req.user_id} is not authorized to delete employee with id: ${req.params.id}`, 401));
    } 
    await employee.destroy();
    return res.status(200).json({ msg: `Employee with ${req.params.id} was deleted` }); 
});

//@route PUT /api/v1/employees/softdelete/:id
//@desc  Soft delete employee by id
//@access Private

exports.softDeleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);

    
    if(!employee){
        return next(new ErrorResponse(`Employee with id: ${req.params.id} does not exist`, 404));
    }
    if(req.user.role !== 'admin' && req.user.id !== employee.user_id){
        return next(new ErrorResponse(`User with id: ${req.user_id} is not authorized to delete employee with id: ${req.params.id}`, 401));
    } 
    await employee.update({ is_active: false });
    res.status(200).json({ success: true, data: {} });
});


//@route GET /api/v1/employees/:user_id
//@desc Get employee by user_id
//@access Private

exports.getEmployeeByUserId = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findOne({ where: { user_id: req.params.user_id } });
    if(!employee){
        return next(new ErrorResponse(`Employee with user id: ${req.params.user_id} does not exist`, 404));
    }
    return res.status(200).json({ employee }); 
});