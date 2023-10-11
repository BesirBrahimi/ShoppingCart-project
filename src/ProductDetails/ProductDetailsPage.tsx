import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailsPage.css";

export interface ExternalProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string;
  description: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();

  const productId = id ? parseInt(id, 10) : 0;
  const [product, setProduct] = useState<ExternalProduct | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  if (!id) {
    return <div>Product ID not provided.</div>;
  }

  if (!product) {
    return (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <p className="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="single-container-details">
      <h2>Product Details</h2>
      <div className="single-product-details">
        <img
          src={product.images[0]}
          alt={product.title}
          className="single-product-image"
        />
        <div className="single-product-div-desc">
          <h3 className="single-product-name">{product.title}</h3>
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
