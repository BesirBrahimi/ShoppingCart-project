
import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import products  from '../ProductsData';
import "./ShoppingCart.css"

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ShoppingCart: React.FC = () => {
  const { cartItems, addToCart } = useContext(CartContext);


  const [productMessages, setProductMessages] = useState<{ [key: number]: string }>({});

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

  return (
    <div className="container">
      <h2>Our Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-spec">
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
              </div>
              {productMessages[product.id] && (
                <p className="message">{productMessages[product.id]}</p>
              )}
              <button className="product-button" onClick={() => handleAddToCart(product)}>
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

