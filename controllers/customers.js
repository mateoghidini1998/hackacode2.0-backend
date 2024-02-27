const Customer = require('../models/Customer.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//@desc Create customer
//@route POST /api/v1/customers
//@access Public

exports.createCustomer = asyncHandler(async (req, res, next) => {
    const { name, lastname, address, dni, birthdate, country, phone } = req.body;

    const customer = await Customer.create({ name, lastname, address, dni, birthdate, country, phone });

    return res.status(200).json({ customer });
});


//@desc Get all customers
//@route GET /api/v1/customers
//@access Public

exports.getCustomers = asyncHandler(async (req, res, next) => {
    const customers = await Customer.findAll();
    if(customers.length === 0) {
        return next(new ErrorResponse('No customers found', 404));
    }
    res.status(200).json({ customers });
});

//@desc Get customer by id
//@route GET /api/v1/customers/:id
//@access Public

exports.getCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id);
    if(!customer) {
        return next(new ErrorResponse('Customer not found', 404));
    }
    res.status(200).json({ customer });
});


//@desc Delete customer by id
//@route DELETE /api/v1/customers/:id
//@access Public

exports.deleteCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id);

    if(!customer) {
        return next(new ErrorResponse(`Customer with id ${req.params.id} not found`, 404));
    }

    await customer.destroy();
    return res.status(200).json({ msg: `Customer with ${req.params.id} was deleted` }); 
});
