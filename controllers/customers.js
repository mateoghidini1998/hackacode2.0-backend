const Customer = require('../models/Customer.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const { Op } = require("sequelize");

//@route   POST /api/v1/customers
//@desc    Create a customer
//@access  Private

exports.createCustomer = asyncHandler(async (req, res, next) => {
    const { dni, email, name, lastname, address, birthdate, country, phone } = req.body
    const customerExists = await Customer.findOne({
        where: {
            [Op.or]: [
              { dni: req.body.dni },
              { email: req.body.email }
            ]
        }
    });

    if(customerExists){
        return next(new ErrorResponse(`Customer with dni: ${req.body.dni} or email: ${req.body.email} already exists`, 400));
    }
    const customer = await Customer.create(req.body)
    res.status(200).json({ customer });
})


//@route   GET /api/v1/customers
//@desc    Get all customers
//@access  Private
exports.getCustomers = asyncHandler(async (req, res, next) => {
    const customers = await Customer.findAll()
    if(customers.length === 0){
        return next(new ErrorResponse(`No customers found`, 404));
    }
    res.status(200).json({ customers });
});

//@route  Get /api/v1/customers/:id
//@desc   Get a customer by id
//@access Private
exports.getCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id)
    if(!customer){
        return next(new ErrorResponse(`Customer not found`, 404));
    }
    res.status(200).json({ customer });
})

//@route  DELETE /api/v1/customers/:id
//@desc   Delete a customer by id
//@access Private
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id)

    if(!customer){
        return next(new ErrorResponse(`Customer not found`, 404));
    }

    await customer.destroy()
    res.status(200).json({ success: true, data: {} });
})

//@route  PUT /api/v1/customers/:id
//@desc   Update a customer by id
//@access Private

exports.updateCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id)

    if(!customer){
        return next(new ErrorResponse(`Customer not found`, 404));
    }

    await customer.update(req.body)
    res.status(200).json({ customer });
    
})