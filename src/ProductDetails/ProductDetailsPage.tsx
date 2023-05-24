import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../ProductsData';
import './ProductDetailsPage.css';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Product ID not provided.</div>;
  }

  const productId = parseInt(id, 10);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="single-container-details">
      <h2>Product Details</h2>
      <div className="single-product-details">
        <img src={product.image} alt={product.name} className="single-product-image" />
        <div>
          <h3 className="single-product-name">{product.name}</h3>
          <p className="single-product-description">{product.description}</p>
          <p className="single-product-price">${product.price}</p>
          <Link to="/bought" className="back-button">
          Go Back
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailsPage;
