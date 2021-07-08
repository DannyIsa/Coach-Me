import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SetErrorContext } from "../../App";

import { ReactComponent as CloseMenu } from "../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchLocation,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/NavBar.css";
import logo from "../../pics/logo.png";

function NavBarTrainee({ signOut, userDetails, alertMessage }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();
  const [coaches, setCoaches] = useState();
  const [request, setRequest] = useState();
  const setError = useContext(SetErrorContext);

  useEffect(async () => {
    if (alertMessage) if (!alertMessage.startsWith("Request")) return;
    if (!userDetails) return;
    let coachesData = (await axios.get("/api/coach/show/all")).data;
    setCoaches(coachesData);
    console.log(coachesData);
    console.log(coachesData);
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
      .catch((err) => setError(err.response.data));
  }

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
            <a href="/trainee/food" className="link">
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
                                <div>
                                  {item.image && (
                                    <img
                                      className="coach-card-image"
                                      src={item.image}
                                    />
                                  )}
                                </div>
                                <div className="coach-card-con">
                                  {item.name}
                                  <p>{item.email}</p>
                                  <div className="coach-card-details">
                                    <p>
                                      Gender <span>{item.gender}</span>
                                    </p>
                                    <p>
                                      Rating <span>8.3</span>
                                    </p>
                                  </div>

                                  <div
                                    className="coaches-item txt"
                                    key={"C" + index}
                                  >
                                    {item.id === userDetails.coach_id ? (
                                      "Your Coach"
                                    ) : item.id === request.coach_id ? (
                                      "Request Pending"
                                    ) : (
                                      <div className="coach-card-btn">
                                        <button
                                          className="chat-btn"
                                          onClick={() =>
                                            sendRequest(
                                              item.id,
                                              userDetails.id,
                                              userDetails.name
                                            )
                                          }
                                        >
                                          Chat
                                        </button>
                                        <button
                                          className="requests-btn"
                                          onClick={() =>
                                            sendRequest(
                                              item.id,
                                              userDetails.id,
                                              userDetails.name
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={faUserPlus}
                                            color="white"
                                            className="fa-fa"
                                          />
                                        </button>
                                      </div>
                                    )}
                                  </div>
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
