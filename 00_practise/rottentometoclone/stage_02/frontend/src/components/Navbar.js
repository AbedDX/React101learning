import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar"
import "./Style.css"





const Navbar = () => {
  return (
    
    <nav className="navbar">
    <h1 className="navbar-title">Rotten Tomatoes</h1>
      <Link to="/" className="navbar-item">
        Home
      </Link>
      <Link to="/" className="navbar-item">
        Add Movie🍅
      </Link>
      <Link to="/login" className="navbar-login">
        Login/Signup
      </Link>
      <Link to="/about" className="navbar-item">
        About
      </Link>
      <Searchbar className="search-bar"/>
    </nav>
  );
};

export default Navbar;