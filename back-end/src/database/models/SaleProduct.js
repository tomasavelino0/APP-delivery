module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: "sales_products",
  }
  );

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'product',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sale',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  }
  return SaleProduct;
}