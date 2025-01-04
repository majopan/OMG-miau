import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import log from "../assets/LogoTrans.png";

const Navbar = () => {
  return (
    <div>
      <header className="navbar">
        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/catalogo" className="nav-link">
            Galería
          </Link>
          <Link to="/conocenos" className="nav-link">
            Conócenos
          </Link>
        </nav>
        <div className="logo-container">
          <img src={log} alt="Cats Logo" className="logo" />
        </div>
        <nav className="nav-menu">
          <Link to="/test" className="button-now">
            Test para ver tu gato adecuado✨
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
