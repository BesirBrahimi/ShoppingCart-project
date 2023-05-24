import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartContextProvider } from './CartContext';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import BoughtProducts from './BoughtProduct/BoughtProducts';
import Navbar from './Navbar/Navbar';
import "./App.css";
import ProductDetailsPage from './ProductDetails/ProductDetailsPage';

function App() {
  return (
    <CartContextProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShoppingCart />} />
            <Route path="/bought" element={<BoughtProducts />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </CartContextProvider>
  );
}

export default App;
