// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/Nav.css";
// // import { useHistory } from "react-router-dom";

// function NavBarCoach({ signOut, userType }) {
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

// export default NavBarCoach;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ReactComponent as CloseMenu } from "../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import "../../styles/NavBar.css";
import logo from "../../pics/logo.png";

function NavBarCoach({ signOut, userType }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();

  return (
    <div className="homeNav">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="/profile">
            <img src={logo} id="logo" alt="CoachMe Logo" />
          </a>
        </div>
        <ul className={click ? "nav-options active" : "nav-options-main"}>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/profile" className="link">
              Home
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href={`/${userType}/workouts`} className="link">
              Workouts
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/coach/clients" className="link">
              Trainees
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/coach/add-exercise" className="link">
              Add Exercise
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
          <CloseMenu className="menu-icon-main" />
        ) : (
          <MenuIcon className="menu-icon-main" />
        )}
      </div>
    </div>
  );
}

export default NavBarCoach;
