const { createProduct, getProductById, getAllProducts } = require('../services/ProductService');

async function createProductController(req, res, next) {
  try {
    const { name, price, urlImage } = req.body;
    const product = await createProduct(name, price, urlImage);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function getProductByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function getAllProductsController(req, res, next) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

module.exports = { createProductController, getProductByIdController, getAllProductsController };
