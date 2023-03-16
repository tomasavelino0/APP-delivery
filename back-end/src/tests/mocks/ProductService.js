module.exports = {
  createProduct: async (name, price, urlImage) => {
    return {
      id: 1,
      name,
      price,
      urlImage
    };
  },
  getProductById: async (id) => {
    if (id === 1) {
      return {
        id: 1,
        name: 'Product 1',
        price: 10,
        urlImage: 'http://test.com/image1.jpg'
      };
    } else {
      throw new Error('Product not found');
    }
  },
  getAllProducts: async () => {
    return [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        urlImage: 'http://test.com/image1.jpg'
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        urlImage: 'http://test.com/image2.jpg'
      }
    ];
  }
};
