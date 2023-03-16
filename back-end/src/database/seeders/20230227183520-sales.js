module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 100.0,
        delivery_address: 'Rua A',
        delivery_number: '123',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 50.0,
        delivery_address: 'Rua A',
        delivery_number: '123',
        sale_date: new Date(),
        status: 'Preparando',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
