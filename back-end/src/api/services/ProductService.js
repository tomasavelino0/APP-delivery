const { Product } = require('../../database/models');

async function createProduct(name, price, urlImage) {
  const product = await Product.create({ name, price, urlImage });
  return product;
}

async function getProductById(id) {
  const product = await Product.findByPk(id);
  return product;
}

async function getAllProducts() {
  const products = await Product.findAll();
  return products;
}

module.exports = { createProduct, getProductById, getAllProducts };
