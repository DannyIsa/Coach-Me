import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ReactComponent as CloseMenu } from "../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import "../../styles/NavBar.css";
import logo from "../../pics/logo.png";

function NavBarTrainee({ signOut, userType }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();

  return (
    <div className="homeNav">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="/dashboard">
            <img src={logo} id="logo" alt="CoachMe Logo" />
          </a>
        </div>
        <ul className={click ? "nav-options active" : "nav-options-main"}>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/food" className="link">
              Nutrition
            </a>
          </li>
          {/* <li className="option" onClick={closeMobileMenu}>
            <a href={`/${userType}/workouts`} className="link">
              Workouts
            </a>
          </li> */}
          <li className="option" onClick={closeMobileMenu}>
            <a href="/trainee/dashboard" className="link">
              Home
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/trainee/profile" className="link">
              Profile
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/trainee/coaches" className="link">
              Find A Coach
            </a>
          </li>
          <li className="option mobile-option" onClick={closeMobileMenu}>
            <Link className="sign-in link" onClick={() => signOut(history)}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <ul className="signIn">
        <li onClick={closeMobileMenu}>
          <Link className="signIn-btn" onClick={() => signOut(history)}>
            Logout
          </Link>
        </li>
      </ul>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon-main" />
        ) : (
          <MenuIcon className="menu-icon-main" />
        )}
      </div>
    </div>
  );
}

export default NavBarTrainee;
