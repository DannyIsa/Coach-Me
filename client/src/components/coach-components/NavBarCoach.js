import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ReactComponent as CloseMenu } from "../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

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
            <a href={`${userType}/workouts`} className="link">
              Workouts
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/coach/clients" className="link">
              Trainees
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <div className="notification">
              <a href="#">
                <div className="notBtn" href="#">
                  {/* // <div className="number">2</div> */}
                  <FontAwesomeIcon
                    icon={faBell}
                    color="#acacac"
                    className="fa-fa"
                  />
                  <div className="box">
                    <div className="display">
                      <div className="nothing">
                        {/* <i className="fas fa-child stick"></i> */}

                        <FontAwesomeIcon
                          icon={faBell}
                          color="#acacac"
                          className="fa-fa"
                        />
                        <div className="cent">
                          Looks Like your all caught up!
                        </div>
                      </div>
                      <div className="cont">
                        <div className="sec new">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg"
                              />
                            </div>
                            <div className="txt">
                              James liked your post: "Pure css notification box"
                            </div>
                            <div className="txt sub">11/7 - 2:30 pm</div>
                          </a>
                        </div>
                        <div className="sec new">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ"
                              />
                            </div>
                            <div className="txt">
                              Annita liked your post: "Pure css notification
                              box"
                            </div>
                            <div className="txt sub">11/7 - 2:13 pm</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O45RK9qyCrZJivYsY6PmeVEJH07l7bkoolJmscBsNjzump27"
                              />
                            </div>
                            <div className="txt">
                              Brie liked your post: "Pure css notification box"
                            </div>
                            <div className="txt sub">11/6 - 9:35 pm</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://c1.staticflickr.com/4/3725/10214643804_75c0b6eeab_b.jpg"
                              />
                            </div>
                            <div className="txt">
                              Madison liked your post: "Pure css notification
                              box"
                            </div>
                            <div className="txt sub">11/6 - 4:04 pm</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/52/NG_headshot_white_shirt_square_Jan18.jpg"
                              />
                            </div>
                            <div className="txt">
                              Ted liked your post: "Pure css notification box"
                            </div>
                            <div className="txt sub">11/6 - 10:37 am</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Pat-headshot-square.jpg"
                              />
                            </div>
                            <div className="txt">
                              Tommas liked your post: "Pure css notification
                              box"
                            </div>
                            <div className="txt sub">11/5 - 7:30 pm</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="https://c1.staticflickr.com/8/7407/13785133614_6254abb8c4.jpg"
                              />
                            </div>
                            <div className="txt">
                              Claire liked your post: "Pure css notification
                              box"
                            </div>
                            <div className="txt sub">11/5 - 2:30 pm</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="//c1.staticflickr.com/1/185/440890151_54c5b920b0_b.jpg"
                              />
                            </div>
                            <div className="txt">
                              Jerimaiah liked your post: "Pure css notification
                              box"
                            </div>
                            <div className="txt sub">11/5 - 1:34 pm</div>
                          </a>
                        </div>
                        <div className="sec">
                          <a href="https://codepen.io/Golez/">
                            <div className="profCont">
                              <img
                                className="profile"
                                src="//c2.staticflickr.com/4/3397/3585544855_28442029a5_z.jpg?zz=1"
                              />
                            </div>
                            <div className="txt">
                              Debra liked your post: "Pure css notification box"
                            </div>
                            <div className="txt sub">11/5 - 10:20 am</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
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

// {/* <div className="notification">
//   <a href="#">
//     <div className="notBtn" href="#">
//       {/* // <div className="number">2</div> */}
//       <FontAwesomeIcon icon={faBell} color="#acacac" className="fa-fa" />
//       <div className="box">
//         <div className="display">
//           <div className="nothing">
//             {/* <i className="fas fa-child stick"></i> */}

//             <FontAwesomeIcon icon={faBell} color="#acacac" className="fa-fa" />
//             <div className="cent">Looks Like your all caught up!</div>
//           </div>
//           <div className="cont">
//             <div className="sec new">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg"
//                   />
//                 </div>
//                 <div className="txt">
//                   James liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/7 - 2:30 pm</div>
//               </a>
//             </div>
//             <div className="sec new">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ"
//                   />
//                 </div>
//                 <div className="txt">
//                   Annita liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/7 - 2:13 pm</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O45RK9qyCrZJivYsY6PmeVEJH07l7bkoolJmscBsNjzump27"
//                   />
//                 </div>
//                 <div className="txt">
//                   Brie liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/6 - 9:35 pm</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://c1.staticflickr.com/4/3725/10214643804_75c0b6eeab_b.jpg"
//                   />
//                 </div>
//                 <div className="txt">
//                   Madison liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/6 - 4:04 pm</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://upload.wikimedia.org/wikipedia/commons/5/52/NG_headshot_white_shirt_square_Jan18.jpg"
//                   />
//                 </div>
//                 <div className="txt">
//                   Ted liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/6 - 10:37 am</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Pat-headshot-square.jpg"
//                   />
//                 </div>
//                 <div className="txt">
//                   Tommas liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/5 - 7:30 pm</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="https://c1.staticflickr.com/8/7407/13785133614_6254abb8c4.jpg"
//                   />
//                 </div>
//                 <div className="txt">
//                   Claire liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/5 - 2:30 pm</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="//c1.staticflickr.com/1/185/440890151_54c5b920b0_b.jpg"
//                   />
//                 </div>
//                 <div className="txt">
//                   Jerimaiah liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/5 - 1:34 pm</div>
//               </a>
//             </div>
//             <div className="sec">
//               <a href="https://codepen.io/Golez/">
//                 <div className="profCont">
//                   <img
//                     className="profile"
//                     src="//c2.staticflickr.com/4/3397/3585544855_28442029a5_z.jpg?zz=1"
//                   />
//                 </div>
//                 <div className="txt">
//                   Debra liked your post: "Pure css notification box"
//                 </div>
//                 <div className="txt sub">11/5 - 10:20 am</div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </a>
// </div> */}
