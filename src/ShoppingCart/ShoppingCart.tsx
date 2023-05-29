import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import products from "../ProductsData";
import "./ShoppingCart.css";
import useCartContext from "../useCartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ShoppingCart: React.FC = () => {
  const DollarUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { addToCart } = useCartContext()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [productMessages, setProductMessages] = useState<{
    [key: number]: string;
  }>({});

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setProductMessages((prevMessages) => ({
      ...prevMessages,
      [product.id]: `Item added! \u2713`,
    }));

    setTimeout(() => {
      setProductMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        delete updatedMessages[product.id];
        return updatedMessages;
      });
    }, 2000);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="container">
      <h2>Our Products</h2>
      <div className="category-list">
        <button
          className={`category-item ${
            selectedCategory === null ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-spec">
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-price">
                  {DollarUsd.format(product.price)}
                </div>
              </div>
              {productMessages[product.id] && (
                <p className="message">{productMessages[product.id]}</p>
              )}
              <button
                className="product-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
