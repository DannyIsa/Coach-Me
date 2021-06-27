import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";

import "../styles/HomePage.css";
import run from "../pics/home.mp4";
import logo from "../pics/logo.png";

function HomePage() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div>
      <div className="homeNav">
        <div className="logo-nav">
          <div className="logo-container">
            <a href="#">
              <img src={logo} id="logo" alt="CoachMe Logo" />
            </a>
          </div>
          <ul className={click ? "nav-options active" : "nav-options"}>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#" className="link">
                Home
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#" className="link">
                How It Works
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#" className="link">
                About
              </a>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link to="/sign-up" className="sign-in link">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <ul className="signIn">
          <li onClick={closeMobileMenu}>
            <Link to="/sign-up" className="signIn-btn">
              Login
            </Link>
          </li>
        </ul>
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <CloseMenu className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
      </div>
      <video autoPlay muted loop id="myVideo">
        <source src={run} type="video/mp4" />
      </video>
      <div className="viewport">
        <div className="welcome">
          <h1 id="welcome-header"> Find. Meet. Get fit. </h1>
          <span id="welcome-span">
            Personal training has never been so easy.
          </span>
          <Link to="/sign-up">
            <button id="start">Start your change now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
