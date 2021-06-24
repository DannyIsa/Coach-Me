import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const navBarItems = [
    {
      title: "Home",
      link: "/",
      className: "nav-item",
    },
    {
      title: "Workouts",
      link: "/workouts",
      className: "nav-item",
    },
    {
      title: "Nutrition",
      link: "/food",
      className: "nav-item",
    },
    {
      title: "Profile",
      link: "/profile",
      className: "nav-item",
    },
    {
      title: "About Us",
      link: "/about",
      className: "nav-item",
    },
  ];
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          COACH-ME
        </NavLink>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {navBarItems.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <NavLink
                  exact
                  to={item.link}
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
