module.exports = {
  createSale: async (saleData) => {
    return {
      id: 1,
      ...saleData,
      status: 'open',
    };
  },
  getSaleById: async (id) => {
    if (id === 1) {
      return {
        id: 1,
        clientId: 1,
        sellerId: 2,
        products: [{ productId: 1, quantity: 2 }],
        status: 'open',
      };
    } else {
      throw new Error('Sale not found');
    }
  },
  getSalesByClientId: async (clientId) => {
    return [
      {
        id: 1,
        clientId,
        sellerId: 2,
        products: [{ productId: 1, quantity: 2 }],
        status: 'open',
      },
      {
        id: 2,
        clientId,
        sellerId: 3,
        products: [{ productId: 2, quantity: 1 }],
        status: 'closed',
      },
    ];
  },
  getSalesBySellerId: async (sellerId) => {
    return [
      {
        id: 1,
        clientId: 1,
        sellerId,
        products: [{ productId: 1, quantity: 2 }],
        status: 'open',
      },
      {
        id: 2,
        clientId: 2,
        sellerId,
        products: [{ productId: 2, quantity: 1 }],
        status: 'closed',
      },
    ];
  },
  updateSaleStatus: async (id, status) => {
    if (id === 1) {
      return;
    } else {
      throw new Error('Sale not found');
    }
  },
};
