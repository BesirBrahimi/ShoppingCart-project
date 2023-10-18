import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailsPage.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export interface ExternalProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
  description: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();

  const productId = id ? parseInt(id, 10) : 0;
  const [product, setProduct] = useState<ExternalProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const exitImage = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      if (selectedImage === product.images.length - 1) {
        setSelectedImage(0);
      } else {
        setSelectedImage(selectedImage + 1);
      }
    }
  };
  
  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      if (selectedImage === 0) {
        setSelectedImage(product.images.length - 1);
      } else {
        setSelectedImage(selectedImage - 1);
      }
    }
  }; 

  return (
    <div className="single-container-details">
      <h2>Product Details</h2>
      <div className="single-product-details">
        {isModalOpen && selectedImage !== null ? (
          <div className="modal-background" onClick={exitImage}>
            <div className="selected-image-div">
              <img src={product.images[selectedImage]} alt={product.title} />

              <button onClick={prevImage} className="nav-button left">
                <AiOutlineLeft className="icon" />
              </button>
              <button onClick={nextImage} className="nav-button right">
                <AiOutlineRight className="icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="product-images-container">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.title}
                className="product-image"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        )}
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
