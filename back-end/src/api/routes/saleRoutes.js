const express = require('express');
// const tokenMiddleware = require('../helper/authMiddleware');
const router = express.Router();
const {
  createSaleController,
  getSaleByIdController,
  getSalesByClientIdController,
  getSalesBySellerIdController,
  updateOrderStatusController,
} = require('../controllers/SaleController');

// Nos requisitos necessários, adicione o tokenMiddleware

router.post('/', createSaleController);
router.get('/:id', getSaleByIdController);
router.patch('/:id', updateOrderStatusController);
router.get('/seller/:id', getSalesBySellerIdController);
router.get('/client/:id', getSalesByClientIdController);

module.exports = router;
