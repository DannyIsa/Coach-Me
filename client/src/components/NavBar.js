import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    const navBarItams = [
        {
            title:"Home",
            link:"/",  
            className: "nav-link"
        },
        {
            title:"Workouts",
            link:"/workouts",
            className: "nav-item"
        },
        {
            title:"Nutrition",
            link:"/nutrition",
            className: "nav-item"
        },
        {
            title:"Profile",
            link:"/profile", 
            className: "nav-item"
        },
        {
            title:"About Us",
            link:"aboutus", 
            className: "nav-item"
        },
    ]
  return (
    <nav>
      <h1>COACH-ME</h1>
      <NavLink exact to="/" className="nav-logo">
            COACH-ME
            {/* <i className="fas fa-code"></i> */}
          </NavLink>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {navBarItams.map((item, index)=> {
              return (
         <li className={item.className}>
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
              )
          })}
      </ul>
    </nav>
  );
}

export default NavBar;
