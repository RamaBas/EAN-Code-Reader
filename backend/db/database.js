const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Product = sequelize.define('Product', {
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand:{
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  priceSell:{
    type: DataTypes.FLOAT,
    allowNull: false
  },
  amountPackage:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Database & tables created!');
};

module.exports = { sequelize, Product, initializeDatabase };
