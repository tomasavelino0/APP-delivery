const User = require('./User');
// const Product = require('./Product');
const SaleProduct = require('./SaleProduct');

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'total_price',
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'delivery_address',
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'delivery_number',
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'sale_date',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: 'sales',
    modelName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};