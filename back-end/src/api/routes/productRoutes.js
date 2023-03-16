const express = require('express');
// const tokenMiddleware = require('../helper/authMiddleware');

const router = express.Router();

const {
  createProductController,
  getProductByIdController,
  getAllProductsController,
} = require('../controllers/ProductController');

// Nos requisitos necessários, adicione o tokenMiddleware

router.post('/', createProductController);
router.get('/:id', getProductByIdController);
router.get('/', getAllProductsController);

module.exports = router;
