const express = require('express');
const router = express.Router();

const {
    createSale,
    getSales,
    getSaleById,
    deleteSale,
    getSalesByEmployeeId,
    getSalesByCustomerId,
    softDeleteSale
} = require('../controllers/sales')

router.post('/', createSale);
router.get('/', getSales);
router.get('/:id', getSaleById);
router.delete('/:id', deleteSale);
router.get('/employee/:id', getSalesByEmployeeId);
router.get('/customer/:id', getSalesByCustomerId);
router.put('/softDelete/:id', softDeleteSale);


module.exports = router;