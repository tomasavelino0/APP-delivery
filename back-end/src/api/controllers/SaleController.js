const {
  createSale,
  getSaleById,
  getSalesByClientId,
  getSalesBySellerId,
  updateSaleStatus,
} = require('../services/SaleService');

const INTERNAL_ERROR = 'Erro interno do servidor';

async function createSaleController(req, res) {
  try {
    const { saleData, products } = req.body;
    const sale = await createSale(saleData, products);
    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: INTERNAL_ERROR });
  }
}

async function getSaleByIdController(req, res) {
  try {
    const { id } = req.params;
    const sale = await getSaleById(id);
    res.json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: INTERNAL_ERROR });
  }
}

async function getSalesByClientIdController(req, res) {
  try {
    const userId = req.params.id;
    const sales = await getSalesByClientId(userId);
    res.status(200).json({ sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: INTERNAL_ERROR });
  }
}

async function getSalesBySellerIdController(req, res) {
  try {
    const sellerId = req.params.id;
    const sales = await getSalesBySellerId(sellerId);
    res.status(200).json({ sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: INTERNAL_ERROR });
  }
}

async function updateOrderStatusController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateSaleStatus(id, status);
    res.status(200).json({ message: 'Status atualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: INTERNAL_ERROR });
  }
}

module.exports = {
  createSaleController,
  getSaleByIdController,
  getSalesByClientIdController,
  getSalesBySellerIdController,
  updateOrderStatusController,
};
