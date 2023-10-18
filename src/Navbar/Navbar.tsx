import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import useCartContext from "../useCartContext";

const Navbar = () => {
  const { boughtProducts } = useCartContext();
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      } else {
        setIsTopOfPage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavLinkActive = (path: string) => {
    return location.pathname === path;
  };

  // const getProductQuantity = () => {
  //   return boughtProducts.reduce((total, product) => total + product.quantity, 0);
  // };


  return (
    <nav className={isTopOfPage ? "navbar" : "navbar nav-fixed"}>
      <div className="navbar-logo">Shopping Cart</div>
      <ul className="navbar-links">
        <li className="direction-nav">
          <NavLink
            to="/"
            className={`navbar-link ${isNavLinkActive("/") ? "active" : ""}`}
          >
            All Products
          </NavLink>
        </li>
        <li className="direction-nav">
          <NavLink
            to="/bought"
            className={`navbar-link ${
              isNavLinkActive("/bought") ? "active" : ""
            }`}
          >
            Bought Products
            {boughtProducts.length > 0 && (
              <span className="boughtProducts-length">
                {/* {getProductQuantity()} */}
                {boughtProducts.length}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
