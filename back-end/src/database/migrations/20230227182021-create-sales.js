module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        allowNull: false,
        field: 'total_price',
        type: Sequelize.DECIMAL(5,2),
      },
      deliveryAddress: {
        allowNull: false,
        field: 'delivery_address',
        type: Sequelize.STRING,
      },
      deliveryNumber: {
        allowNull: false,
        field: 'delivery_number',
        type: Sequelize.STRING,
      },
      saleDate: {
        allowNull: false,
        field: 'sale_date',
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};

