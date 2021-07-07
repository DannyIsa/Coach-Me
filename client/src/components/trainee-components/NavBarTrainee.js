import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { ReactComponent as CloseMenu } from "../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchLocation,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/NavBar.css";
import logo from "../../pics/logo.png";

function NavBarTrainee({ signOut, userDetails, alertMessage }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();
  // const [render, setRender] = useState(false);
  const [coaches, setCoaches] = useState();
  const [request, setRequest] = useState();

  useEffect(async () => {
    if (alertMessage) if (!alertMessage.startsWith("Request")) return;
    if (!userDetails) return;
    let coachesData = (await axios.get("/api/coach/show/all")).data;
    setCoaches(coachesData);
    let requestData = (
      await axios.get("/api/trainee/request/show/" + userDetails.id)
    ).data;
    if (requestData) setRequest(requestData);
  }, [userDetails, alertMessage]);

  function sendRequest(coachId, traineeId, traineeName) {
    const content = prompt("Enter Your Request Content");
    if (!content) return;
    axios
      .post(`/api/trainee/request/send/${traineeId}`, {
        coachId,
        traineeName,
        content,
      })
      .then(({ data }) => {
        setRequest(data);
      })
      .catch((err) => console.log(err.response.data));
  }

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111");
  console.log(request);
  console.log(
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!2222222"
  );

  console.log(coaches);
  console.log(
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!3333333"
  );

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
            <a href="/dashboard" className="link">
              Home
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/food" className="link">
              Nutrition
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/trainee/profile" className="link">
              Profile
            </a>
          </li>
          {/* <li className="option" onClick={closeMobileMenu}>
            <a href="/trainee/coaches" className="link">
              Find A Coach
            </a>
          </li> */}
          <li className="option">
            <div className="notification">
              <div className="notBtn">
                <FontAwesomeIcon
                  icon={faSearchLocation}
                  color="white"
                  className="fa-fa"
                />
                <div className="box">
                  <div className="display">
                    <div className="cont">
                      <div className="alerts-div">
                        {coaches && request
                          ? coaches.map((item, index) => (
                              <div className="alert sec" key={"alert" + index}>
                                <div className="txt">{item.name}</div>
                                <div
                                  className="coaches-item txt"
                                  key={"C" + index}
                                >
                                  {item.id === userDetails.coach_id ? (
                                    "Your Coach"
                                  ) : item.id === request.coach_id ? (
                                    "Request Pending"
                                  ) : (
                                    <button
                                      onClick={() =>
                                        sendRequest(
                                          item.id,
                                          userDetails.id,
                                          userDetails.name
                                        )
                                      }
                                    >
                                      Send Request
                                    </button>
                                  )}
                                </div>
                                {/* <div className="txt sub">
                                  {new Date(item.updatedAt).toLocaleDateString(
                                    "it-IT"
                                  ) +
                                    ", " +
                                    new Date(item.updatedAt).toLocaleTimeString(
                                      "it-IT"
                                    )}
                                </div> */}
                              </div>
                            ))
                          : "Loading..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
