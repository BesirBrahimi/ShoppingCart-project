import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import useCartContext from "../useCartContext";

const Navbar = () => {
  const { boughtProducts } = useCartContext();
  const location = useLocation();

  const isNavLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const getProductQuantity = () => {
    return boughtProducts.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <nav className="navbar">
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
                {getProductQuantity()}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
