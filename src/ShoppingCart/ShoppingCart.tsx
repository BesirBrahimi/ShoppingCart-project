import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import "./ShoppingCart.css";
import useCartContext from "../useCartContext";
import { Product } from "../ProductsData";

export interface ExternalProducts {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const ShoppingCart: React.FC = () => {
  const DollarUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { addToCart } = useCartContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [productMessages, setProductMessages] = useState<{
    [key: number]: string;
  }>({});

  const [products, setProducts] = useState<ExternalProducts[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false); // Make sure to set loading to false in case of an error too
      });
  }, []);

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

  if (loading) {
    return (
      <div
        style={{
          width: "90%",
          height: "80vh",
          margin: "30px auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: "10px auto" }}>Loading...</h3>
      </div>
    );
  }

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
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-spec">
              <div className="product-details">
                <div className="product-name">{product.title.slice(0, 20)}</div>
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

///////////////////////////////////////////////////

// import { CartContext } from "../CartContext";
// import products from "../ProductsData";
// import "./ShoppingCart.css";
// import useCartContext from "../useCartContext";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
// }

// const ShoppingCart: React.FC = () => {
//   const DollarUsd = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   });

//   const { addToCart } = useCartContext()
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const [productMessages, setProductMessages] = useState<{
//     [key: number]: string;
//   }>({});

//   const handleAddToCart = (product: Product) => {
//     addToCart(product);
//     setProductMessages((prevMessages) => ({
//       ...prevMessages,
//       [product.id]: `Item added! \u2713`,
//     }));

//     setTimeout(() => {
//       setProductMessages((prevMessages) => {
//         const updatedMessages = { ...prevMessages };
//         delete updatedMessages[product.id];
//         return updatedMessages;
//       });
//     }, 2000);
//   };

//   const filteredProducts = selectedCategory
//     ? products.filter((product) => product.category === selectedCategory)
//     : products;

//   const categories = [...new Set(products.map((product) => product.category))];

//   return (
//     <div className="container">
//       <h2>Our Products</h2>
//       <div className="category-list">
//         <button
//           className={`category-item ${
//             selectedCategory === null ? "active" : ""
//           }`}
//           onClick={() => setSelectedCategory(null)}
//         >
//           All
//         </button>
//         {categories.map((category) => (
//           <button
//             key={category}
//             className={`category-item ${
//               selectedCategory === category ? "active" : ""
//             }`}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//       <ul className="product-list">
//         {filteredProducts.map((product) => (
//           <li key={product.id} className="product-item">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="product-image"
//             />
//             <div className="product-spec">
//               <div className="product-details">
//                 <div className="product-name">{product.name}</div>
//                 <div className="product-price">
//                   {DollarUsd.format(product.price)}
//                 </div>
//               </div>
//               {productMessages[product.id] && (
//                 <p className="message">{productMessages[product.id]}</p>
//               )}
//               <button
//                 className="product-button"
//                 onClick={() => handleAddToCart(product)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShoppingCart;
