const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Product, initializeDatabase } = require('./db/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Permitir todas las orígenes para pruebas. Cambia esto en producción.
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/barcode', async (req, res) => {
  const { barcode } = req.query ? req.query : req.body;
  console.log("---- buscando: ",barcode, " ----");
  const product = await Product.findOne({ where: { barcode } });
  console.log("product", product);
  if (product) {
    io.emit('barcodeScanned', product);  // Enviar a todos los clientes conectados
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, async () => {
  await initializeDatabase();
  console.log('Servidor escuchando en http://localhost:3000');
});
