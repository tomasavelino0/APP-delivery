const { Sale, Product, SaleProduct } = require('../../database/models');

async function createSale(saleData, products) {
  const sale = await Sale.create(saleData);
  products.forEach(async (product) => {
    await SaleProduct.create({
      saleId: sale.id,
      productId: product.id,
      quantity: product.quantity,
    });
  });
  return sale;
}

async function getSaleById(id) {
  const sale = await Sale.findByPk(id, {
    include: ['seller', 'user', { model: Product, as: 'product' }],
  });
  return sale;
}

async function getSalesByClientId(userId) {
  const sales = await Sale.findAll({
      where: { userId },
      include: ['seller', 'user', { model: Product, as: 'product' }],
    });
    return sales;
}

async function getSalesBySellerId(sellerId) {
  const sales = await Sale.findAll({
      where: { sellerId },
      include: ['seller', 'user', { model: Product, as: 'product' }],
    });
    return sales;
}

async function updateSaleStatus(id, status) {
  await Sale.update({ status }, {
    where: { id },
  });
}

module.exports = {
  createSale,
  getSaleById,
  getSalesByClientId,
  getSalesBySellerId,
  updateSaleStatus,
};
