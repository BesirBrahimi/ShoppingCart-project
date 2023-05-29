import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import "./BoughtProduct.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface BoughtProduct extends Product {
  quantity: number;
}

const BoughtProducts: React.FC = () => {
  const {
    boughtProducts,
    addToCart,
    removeFromBoughtProducts,
    clearBoughtProducts,
  } = useContext(CartContext);

  const DollarUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const removeBoughtProduct = (productId: number) => {
    removeFromBoughtProducts(productId);
  };

  const clearAllProducts = () => {
    clearBoughtProducts();
  };

  const totalPrice = boughtProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="header-bought">
        <h2>Bought Products</h2>
        <div className="total-clear">
          <h3 className="total-price">
            Total Price: {DollarUsd.format(totalPrice)}
          </h3>
          <button className="clear-all-button" onClick={clearAllProducts}>
            Clear All
          </button>
        </div>
      </div>
      {boughtProducts.length === 0 ? (
        <div className="empty">
          <img
            src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png"
            className="empty-cart"
            alt=""
          />
          <Link to="/">
            <button className="go-back-button">Go Back</button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="bought-products-list">
            {boughtProducts.map((product) => (
              <li key={product.id} className="bought-product-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bought-product-image"
                />
                <div className="bought-product-details">
                  <div className="bought-product-name">{product.name}</div>
                  <div className="bought-product-quantity">
                    Quantity: {product.quantity}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    className="product-button"
                    onClick={() => addToCart(product)}
                  >
                    Add More
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => removeBoughtProduct(product.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/products/${product.id}`}>
                    <button className="show-details-button">
                      {" "}
                      Show Details
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BoughtProducts;
