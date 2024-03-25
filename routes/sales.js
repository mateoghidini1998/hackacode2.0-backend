const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
    createSale,
    getSales,
    getSaleById,
    deleteSale,
    getSalesByEmployeeId,
    getSalesByCustomerId,
    softDeleteSale,
    getEmployeeWithMostSalesInYear,
    updateSale
} = require('../controllers/sales')

router.post('/', protect, createSale);
router.get('/', protect, getSales);
router.get('/:id', protect, getSaleById);
router.delete('/:id', protect, deleteSale);
router.get('/employee/:id', protect, getSalesByEmployeeId);
router.get('/customer/:id', protect, getSalesByCustomerId);
router.put('/softDelete/:id', protect, softDeleteSale);
router.put('/:id', protect, updateSale)
router.get('/most-sales/:year', protect, getEmployeeWithMostSalesInYear);


module.exports = router;