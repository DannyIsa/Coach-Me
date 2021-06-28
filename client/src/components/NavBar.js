// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/NavBar.css";
// // import { useHistory } from "react-router-dom";

// function NavBar({ signOut, userType }) {
//   const [click, setClick] = useState(false);
//   const handleClick = () => setClick(!click);
//   // const history = useHistory();
//   const navBarItems = [
//     {
//       title: "Home",
//       link: "/",
//       className: "nav-item",
//     },
//     {
//       title: "Workouts",
//       link: `/${userType}/workouts`,
//       className: "nav-item",
//     },
//     {
//       title: "Nutrition"/food,
//       link: "/food",
//       className: "nav-item",
//     },
//     {
//       title: "Profile",
//       link: "/profile",
//       className: "nav-item",
//     },
//     {
//       title: "About Us",
//       link: "/about",
//       className: "nav-item",
//     },
//   ];
//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* <button className="sign-out" onClick={() => signOut(history)}>
//           Sign Out
//         </button> */}
//         <NavLink exact to="/" className="nav-logo">
//           COACH-ME
//         </NavLink>
//         <ul className={click ? "nav-menu active" : "nav-menu"}>
//           {navBarItems.map((item, index) => {
//             return (
//               <li key={index} className={item.className}>
//                 <NavLink
//                   exact
//                   to={item.link}
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   {item.title}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//         <div className="nav-icon" onClick={handleClick}>
//           {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../styles/NavBar.css";
// import "../styles/HomePage.css";
import SignOutButton from "./SignOutButton";

// import run from "../pics/home.mp4";
import logo from "../pics/logo.png";
// import "../styles/NavBar.css";
// // import { useHistory } from "react-router-dom";

function NavBar({ signOut, userType }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();

  return (
    // <div>
    <div className="homeNav">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="/">
            <img src={logo} id="logo" alt="CoachMe Logo" />
          </a>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/" className="link">
              Home
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="`/${userType}/workouts`" className="link">
              Workouts
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/food" className="link">
              Nutrition
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/profile" className="link">
              Profile
            </a>
          </li>
          <li className="option mobile-option" onClick={closeMobileMenu}>
            <Link className="sign-in link" onClick={() => signOut(history)}>
              SignOut
            </Link>
          </li>
        </ul>
      </div>
      <ul className="signIn">
        <li onClick={closeMobileMenu}>
          <Link className="signIn-btn" onClick={() => signOut(history)}>
            SignOut
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
    // {/* </div> */}
  );
}

export default NavBar;
