import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';  // Asegúrate de tener este archivo para los estilos

const socket = io('http://localhost:3000/');

const App = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    socket.on('barcodeScanned', (product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
      setTotalPrice((prevTotal) => prevTotal + product.price);
    });

    return () => {
      socket.off('barcodeScanned');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Productos Escaneados</h1>
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </header>
      <div className="Product-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
