const { sequelize, Product } = require('./database');

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Eliminar y recrear la base de datos
  await Product.bulkCreate([
    { barcode: '7790064104686', description: 'Estrella Amarillo', brand: 'Estrella', category: 'Bebe > Limpieza', price: 10.0, priceSell: 14.0, AmountPackage: 10 },
    { barcode: '3333', description: 'Producto 1', brand: 'Producto 1', category: 'Producto 1', price: 10.0, priceSell: 14.0, AmountPackage: 10 },
    // Agrega más productos según sea necesario
  ]);
  console.log('Base de datos poblada!');
  process.exit(0);
};

seedDatabase();
