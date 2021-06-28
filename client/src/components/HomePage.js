import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../styles/HomePage.css";
import run from "../pics/home.mp4";
import logo from "../pics/logo.png";

function HomePage() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

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
              <a href="#viewport1" className="link">
                How It Works
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="#viewport2" className="link">
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
      <div id="viewport1">
        <h1>How It Works</h1>
        <p>khfddfuijbhvfgtuuyoijkbhvgchfdtuyukgjhgcfhxgrdytufyjhgvchdtfyjhvg</p>
      </div>
      <div id="viewport2">
        <h1>About</h1>
        <p>khfddfuijbhvfgtuuyoijkbhvgchfdtuyukgjhgcfhxgrdytufyjhgvchdtfyjhvg</p>
      </div>
      <footer>
        <section id="contact">
          <ul>
            <li>
              <p>Oren</p>
              <a
                href="https://github.com/orenb99"
                target="_blank"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <p>Moran</p>
              <a
                href="https://github.com/moran-aga"
                target="_blank"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <p>Daniel</p>
              <a
                href="https://github.com/DannyIsa"
                target="_blank"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <p>Amit</p>
              <a
                href="https://github.com/amitby98"
                target="_blank"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
        </section>
        <section id="terms">
          <ul id="terms1">
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <span>© 2021, CoachMe Team. All Rights Reserved.</span>
        </section>
      </footer>
    </div>
  );
}

export default HomePage;
