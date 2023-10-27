import React, { useContext, useState, useEffect } from "react";
import "./ShoppingCart.css";
import useCartContext from "../useCartContext";
import { Product } from "../ProductsData";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Pagination from "./Pagination";

export interface ExternalProducts {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string;
  description: string;
}

const ShoppingCart: React.FC = () => {
  const DollarUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { addToCart } = useCartContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (direction: "left" | "right" | number) => {
    if (direction === "left" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "right" &&
      currentPage < Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === "number") {
      setCurrentPage(direction);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const [productMessages, setProductMessages] = useState<{
    [key: number]: string;
  }>({});

  const [products, setProducts] = useState<ExternalProducts[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCurrentPage(1);
    }
  }, [selectedCategory]);

  const handleAddToCart = (product: ExternalProducts) => {
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

  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h2>Our Products</h2>
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p className="loading">Loading...</p>
        </div>
      ) : (
        <>
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <ul className="product-list">
            {productsToDisplay.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-spec">
                  <div className="product-details">
                    <div className="product-name">{product.title}</div>
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
          {filteredProducts.length > 8 && (
            <Pagination
              handlePageChange={handlePageChange}
              filteredProducts={filteredProducts}
              productsPerPage={productsPerPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
