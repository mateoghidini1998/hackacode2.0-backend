const Sale = require('../models/Sale.model');
const Service = require('../models/Service.model');
const SalesServices = require('../models/SalesServices.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

//@route   POST /api/v1/sales
//@desc    Create Sale
//@access  Private
exports.createSale = asyncHandler(async (req, res, next) => {
    const { services, customer_id, employee_id, is_active, payment_method } = req.body;

    const totalPrice = await Promise.all(services.map(async (serviceData) => {
        const { id } = serviceData;
        const service = await Service.findByPk(id, { attributes: ['id', 'price'] });

        if (!service) {
            return next(new ErrorResponse(`Service with id: ${id} not found`, 404));
        }

        return parseFloat(service.price);
    })).then(prices => prices.reduce((acc, price) => acc + price, 0));

    let commissionRate = 0;
    switch (payment_method) {
        case 'cash':
            commissionRate = 0;
            break;
        case 'debit':
            commissionRate = 0.03; // 3%
            break;
        case 'credit':
            commissionRate = 0.09; // 9%
            break;
        case 'ewallet':
            commissionRate = 0;
            break;
        case 'transfer':
            commissionRate = 0.0245; // 2.45%
            break;
        default:
            return next(new ErrorResponse(`Invalid payment method: ${payment_method}`, 400));
    }

    const finalProfit = totalPrice + (totalPrice * commissionRate);

    const sale = await Sale.create({ employee_id, customer_id, is_active, payment_method, profit: parseFloat(finalProfit) });

    const saleServices = await Promise.all(services.map(async (serviceData) => {
        const { id } = serviceData;
        const service = await Service.findByPk(id, { attributes: ['id', 'price'] });

        if (!service) {
            return next(new ErrorResponse(`Service with id: ${id} not found`, 404));
        }

        return await SalesServices.create({
            sale_id: sale.id,
            service_id: id,
            is_active: true,
        });
    }));

    await sequelize.query(`
        UPDATE Sales 
        SET profit = COALESCE(
            (SELECT SUM(Services.price) 
            FROM SalesServices 
            JOIN Services ON SalesServices.service_id = Services.id 
            WHERE SalesServices.sale_id = Sales.id), 0
        )
        WHERE id = :saleId
    `, { replacements: { saleId: sale.id }, type: sequelize.QueryTypes.UPDATE });

    res.status(201).json({ sale, saleServices });
});


//@route   GET /api/v1/sales
//@desc    Get all sales
//@access  Private
exports.getSales = asyncHandler(async (req, res, next) => {

    const sales = await sequelize.query(`
        SELECT 
            s.id AS sale_id, 
            s.employee_id, 
            s.customer_id, 
            s.payment_method, 
            s.profit, 
            s.is_active ,
            s.createdAt, 
            ss.service_id, 
            sv.service_code, 
            sv.name, 
            sv.description, 
            sv.service_date, 
            sv.price
        FROM 
            Sales s
        INNER JOIN 
            SalesServices ss ON s.id = ss.sale_id
        INNER JOIN 
            Services sv ON ss.service_id = sv.id
        WHERE 
            s.is_active = true;
    `, { type: QueryTypes.SELECT });

    const transformedSales = sales.reduce((acc, item) => {
        if (!acc[item.sale_id]) {
            acc[item.sale_id] = {
                sale_id: item.sale_id,
                is_active: item.is_active,
                profit: item.profit,
                payment_method: item.payment_method,
                employee_id: item.employee_id,
                customer_id: item.customer_id,
                createdAt: item.createdAt,
                services: []
            };
        }
        acc[item.sale_id].services.push({
            service_id: item.service_id,
            is_active: item.is_active,
            service_code: item.service_code,
            name: item.name,
            description: item.description,
            service_date: item.service_date,
            price: item.price
        });
        return acc;
    }, {});

    const finalSales = Object.values(transformedSales);

    const totalSalesCount = await sequelize.query(`
        SELECT 
            COUNT(DISTINCT s.id) AS total_sales
        FROM 
            Sales s
        WHERE 
            s.is_active = true;
    `, { type: QueryTypes.SELECT });

    const profitAndSalesByPaymentMethod = await sequelize.query(`
        SELECT 
            payment_method,
            SUM(profit) AS total_profit,
            COUNT(*) AS total_sales
        FROM 
            Sales
        WHERE 
            is_active = true
        GROUP BY 
            payment_method;
    `, { type: QueryTypes.SELECT });

    res.status(200).json({
        total_sales: totalSalesCount[0].total_sales,
        sales: finalSales,
        profit_by_payment_method: profitAndSalesByPaymentMethod
    });
});



//@route  GET /api/v1/sales/:id
//@desc   Get sale by id
//@access Private
exports.getSaleById = asyncHandler(async (req, res, next) => {
    const saleId = req.params.id;

    const saleQuery = await sequelize.query(`
        SELECT s.id AS sale_id, s.employee_id, s.customer_id, ss.service_id, sv.service_code, sv.name, sv.description, sv.service_date, sv.price
        FROM Sales s
        INNER JOIN SalesServices ss ON s.id = ss.sale_id
        INNER JOIN Services sv ON ss.service_id = sv.id
        WHERE s.id = ${saleId};
    `, {
        type: QueryTypes.SELECT
    });

    if (!saleQuery || saleQuery.length === 0) {
        return next(new ErrorResponse(`Sale with id: ${saleId} not found`, 404));
    }

    const saleData = {
        sale_id: saleQuery[0].sale_id,
        employee_id: saleQuery[0].employee_id,
        customer_id: saleQuery[0].customer_id,
        services: saleQuery.map(item => ({
            service_id: item.service_id,
            service_code: item.service_code,
            name: item.name,
            description: item.description,
            service_date: item.service_date,
            price: item.price
        }))
    };

    res.status(200).json({ sale: saleData });
});

//@route DELETE /api/v1/sales/:id
//@desc  Delete sale by id
//@access Private
exports.deleteSale = asyncHandler(async (req, res, next) => {
    const saleId = req.params.id;

    const sale = await Sale.findByPk(saleId);

    if (!sale) {
        return next(new ErrorResponse(`Sale with id: ${saleId} not found`, 404));
    }

    await sale.destroy();

    res.status(200).json({ success: true, data: {} });
});


//@route PUT /api/v1/sales/softdelete/:id
//@desc   Soft delete a sales by id
//@access Private
exports.softDeleteSale = asyncHandler(async (req, res, next) => {
    const sale = await Sale.findByPk(req.params.id);

    if (!sale) {
        return next(new ErrorResponse(`Sale not found`, 404));
    }

    await sale.update({ is_active: false });

    res.status(200).json({ success: true, data: {} });
});


//@route   GET /api/v1/sales/employee/:employeeId
//@desc    Get all sales by employee id
//@access Private
exports.getSalesByEmployeeId = asyncHandler(async (req, res, next) => {
    const employeeId = req.params.id;

    const totalSales = await Sale.count({
        where: { employee_id: employeeId },
        distinct: 'id'
    });

    const sale = await sequelize.query(`
      SELECT 
        s.id AS sale_id, s.employee_id, s.customer_id, ss.service_id, sv.service_code, sv.name, sv.description, sv.service_date, sv.price
      FROM 
        Sales s
      INNER JOIN 
        SalesServices ss ON s.id = ss.sale_id
      INNER JOIN 
        Services sv ON ss.service_id = sv.id
      WHERE 
        s.employee_id = :employeeId
    `, {
        replacements: { employeeId: employeeId },
        type: sequelize.QueryTypes.SELECT
    });

    if (!sale || sale.length === 0) {
        return next(new ErrorResponse(`No sales found for employee with id: ${employeeId}`, 404));
    }

    const transformedSale = sale.reduce((acc, item) => {
        if (!acc[item.sale_id]) {
            acc[item.sale_id] = {
                sale_id: item.sale_id,
                employee_id: item.employee_id,
                customer_id: item.customer_id,
                services: [],
            };
        }
        acc[item.sale_id].services.push({
            service_id: item.service_id,
            service_code: item.service_code,
            name: item.name,
            description: item.description,
            service_date: item.service_date,
            price: parseFloat(item.price)
        });
        return acc;
    }, {});


    const total = Object.values(transformedSale).reduce((acc, sale) => {
        const saleTotal = sale.services.reduce((total, service) => total + parseFloat(service.price), 0);
        return acc + saleTotal;
    }, 0);

    const saleData = {
        count: totalSales,
        total: total,
        sales: Object.values(transformedSale)
    };

    res.status(200).json({ result: saleData });
});



//@route   GET /api/v1/sales/customer/:customerId
//@desc    Get all sales by customer id
//@access Private
exports.getSalesByCustomerId = asyncHandler(async (req, res, next) => {
    const customerId = req.params.id;
    const result = await sequelize.query(`
      SELECT 
        s.id AS sale_id, s.employee_id, s.customer_id, ss.service_id, sv.service_code, sv.name, sv.description, sv.service_date, sv.price
      FROM 
        Sales s
      INNER JOIN 
        SalesServices ss ON s.id = ss.sale_id
      INNER JOIN 
        Services sv ON ss.service_id = sv.id
      WHERE 
        s.customer_id = :customerId
    `, {
        replacements: { customerId: customerId },
        type: sequelize.QueryTypes.SELECT
    });

    if (!result || result.length === 0) {
        return next(new ErrorResponse(`No sales found for employee with id: ${customerId}`, 404));
    }

    res.status(200).json({ result });
});


//@route  PUT /api/v1/sales/:id
//@desc   Update sale by id
//@access Private
exports.updateSale = asyncHandler(async (req, res, next) => {
    const saleId = req.params.id;

    const sale = await Sale.findByPk(saleId);

    if (!sale) {
        return next(new ErrorResponse(`Sale with id: ${saleId} not found`, 404));
    }

    await sale.update(req.body);

    res.status(200).json({ sale });

});


//@route  GET /api/v1/sales/most-sales/:year
//@desc   Get employee with most sales in a year
//@access Private
exports.getEmployeeWithMostSalesInYear = asyncHandler(async (req, res, next) => {
    const year = req.params.year;

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    const result = await sequelize.query(`
        SELECT 
            employee_id, COUNT(*) AS sales_count
        FROM 
            Sales
        WHERE 
            createdAt BETWEEN :startOfYear AND :endOfYear
        GROUP BY 
            employee_id
        ORDER BY 
            sales_count DESC
        LIMIT 1
    `, {
        replacements: { startOfYear: startOfYear, endOfYear: endOfYear },
        type: sequelize.QueryTypes.SELECT
    });

    if (!result || result.length === 0) {
        return next(new ErrorResponse(`No sales found for the year: ${year}`, 404));
    }

    const employeeWithMostSales = result[0];

    res.status(200).json({ result: employeeWithMostSales });
});
