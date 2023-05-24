import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  const location = useLocation();

  const isNavLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Shopping Cart</div>
      <ul className="navbar-links">
        <li className='direction-nav'>
          <NavLink to="/" className={`navbar-link ${isNavLinkActive('/') ? 'active' : ''}`}>
            All Products
          </NavLink>
        </li>
        <li className='direction-nav'>
          <NavLink
            to="/bought"
            className={`navbar-link ${isNavLinkActive('/bought') ? 'active' : ''}`}
          >
            Bought Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
