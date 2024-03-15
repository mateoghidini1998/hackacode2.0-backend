const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Service = require('../models/Service.model');
const advancedResults = require('../middleware/advancedResults');

//@route   GET /api/v1/services
//@desc    Get all services 
//@access  Public

exports.getServices = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});


//@route   GET /api/v1/services/:id
//@desc    Get a service
//@access  Public

exports.getService = asyncHandler(async (req, res, next) => {
    if(req.params.id){
        const service = await Service.findById(req.params.id);
        if(!service){
            return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
        }
        return res.status(200).json({service });
    }
});

//@route   POST /api/v1/services
//@desc    Create a service
//@access  Private

exports.createService = asyncHandler(async (req, res, next) => {
    const service = await Service.create(req.body);
    res.status(201).json({ service });
});

//@route   PUT /api/v1/services/:id
//@desc    Update a service
//@access  Private

exports.updateService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
    }

    await service.update(req.body);
    res.status(200).json({ service });
});

//@route   DELETE /api/v1/services/:id
//@desc    Delete a service
//@access  Private

exports.deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
    }

    await service.destroy();
    res.status(200).json({ msg: `Service with id ${req.params.id} was deleted` }); 
    return res.status(200).json({ service }); 
});