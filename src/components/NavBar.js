import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Spend Analyzer</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/category">Category</Link>
        <Link to="/spendetails">Spend Details</Link>
        <Link to="/spendwisereports">Spend Report</Link>
        <Link to="/categorywisereports">Category Report</Link>
      </div>
    </nav>
  );
};

export default NavBar;
