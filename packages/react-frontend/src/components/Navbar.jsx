import React from "react"; 
import logo from "../assets/logo.svg";
import searchIcon from "../assets/search-button.svg";
import signInIcon from "../assets/sign-in-button.svg";
import logoutIcon from "../assets/logout-button.svg";
import "./Navbar.css";

export default function Navbar({isLoggedIn = false, showSearch = true}) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Poly+ Inventory Logo" className="logo" />
      </div>

      <ul className="navbar-menu">
        <li>Dashboard</li>
        <li>Resources</li>
        <li>Features</li>
        <li>About</li>
      </ul>

      <div className="navbar-right">
        {showSearch && <img src={searchIcon} alt="Search" className="icon search" />}
        <div className="auth-button">  
          <img
            src={isLoggedIn ? logoutIcon : signInIcon}
            alt={isLoggedIn ? "Logout" : "Sign In"}
            className={`icon ${isLoggedIn ? "logout" : "sign-in"}`}
          />
        </div>
      </div>
    </nav>
  );
}