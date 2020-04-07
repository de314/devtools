import React from 'react';

import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      Header
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/home">
          Home
        </NavLink>
        <NavLink className="nav-item nav-link" to="/features">
          Features
        </NavLink>
        <NavLink className="nav-item nav-link" to="/pricing">
          Pricing
        </NavLink>
        <NavLink className="nav-item nav-link" to="/redux-demo">
          Redux Demo
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Header;
