import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SetErrorContext } from "../../App";

import { ReactComponent as CloseMenu } from "../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheck,
  faTimes,
  faChild,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/NavBar.css";
import logo from "../../pics/logo.png";

function NavBarCoach({ signOut, userType, userDetails, alertMessage }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();
  // const [hideAlerts, setHideAlerts] = useState(true);
  const [render, setRender] = useState(false);
  const [chosenTrainee, setChosenTrainee] = useState("");
  const setError = useContext(SetErrorContext);

  async function getRequests() {
    try {
      let requests = await axios.get(
        "/api/coach/requests/show/" + userDetails.id
      );
      return requests.data;
    } catch (err) {
      setError(err.response.data);
      return [];
    }
  }

  async function getClients() {
    try {
      let clients = await axios.get(
        "/api/coach/clients/show/" + userDetails.id
      );
      return clients.data;
    } catch (err) {
      return [];
    }
  }
  useEffect(() => {
    if (alertMessage === "New Alert") setRender(!render);
  }, [alertMessage]);

  useEffect(async () => {
    if (!userDetails) return;
    setRequests(await getRequests());
    setClients(await getClients());
  }, [userDetails, render]);

  function handleRequest(accept, traineeId) {
    axios
      .put(
        `/api/coach/request/${accept ? "accept" : "decline"}/${
          userDetails.id
        }?traineeId=${traineeId}`
      )
      .then(() => setRender(!render))
      .catch((err) => setError(err.response.data));
  }

  return (
    <div className="homeNav">
      <div className="logo-nav">
        <div className="logo-container">
          <Link to="/dashboard">
            <img src={logo} id="logo" alt="CoachMe Logo" />
          </Link>
        </div>
        <ul className={click ? "nav-options active" : "nav-options-main"}>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/dashboard" className="link">
              Home
            </Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/coach/workouts" className="link">
              Workouts
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a href="/coach/clients" className="link">
              Trainees
            </a>
          </li>
          <li className="option">
            <div className="notification">
              <div className="notBtn">
                <div className="number">
                  {requests && requests.length > 0 && (
                    <div className="requests-alert">{requests.length}</div>
                  )}
                </div>
                <FontAwesomeIcon
                  icon={faBell}
                  color="white"
                  className="fa-fa"
                />
                <div className="box">
                  <div className="display">
                    {/* <div className="nothing">
                      <FontAwesomeIcon
                        icon={faChild}
                        color="#acacac"
                        className="fa-fa stick"
                      />
                    <div className="cent">Looks Like your all caught up!</div>
                    </div> */}

                    <div className="cont">
                      <div className="alerts-div">
                        {requests &&
                          requests.map((item, index) => (
                            <div
                              className="alert trainee-sec"
                              key={"alert" + index}
                            >
                              <div>
                                {item.image && (
                                  <img
                                    className="trainee-card-image"
                                    src={item.image}
                                  />
                                )}
                              </div>
                              <div className="coach-card-con">
                                {item.trainee_name}
                                <p>{item.email}</p>
                                <div className="trainee-card-details">
                                  <p>
                                    Message <span>{item.content}</span>
                                  </p>
                                </div>

                                <div
                                  className="trainees-item txt"
                                  key={"C" + index}
                                >
                                  <p className="date-requests">
                                    {new Date(
                                      item.updatedAt
                                    ).toLocaleDateString("it-IT") +
                                      ", " +
                                      new Date(
                                        item.updatedAt
                                      ).toLocaleTimeString("it-IT")}
                                  </p>
                                  <div className="coach-card-btn">
                                    <button className="chat-btn">Chat</button>
                                    <button
                                      className="requests-btn"
                                      onClick={() =>
                                        handleRequest(true, item.trainee_id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        color="#acacac"
                                        className="fa-fa"
                                      />
                                    </button>
                                    <button
                                      className="requests-btn"
                                      onClick={() =>
                                        handleRequest(false, item.trainee_id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faTimes}
                                        color="#acacac"
                                        className="fa-fa"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
