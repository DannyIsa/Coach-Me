import axios from "axios";
import React, { useEffect, useState } from "react";
import EditableInputInline from "../EditableInputInline";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCalendarAlt,
  faWeight,
  faEnvelope,
  faPhoneAlt,
  faGenderless,
  faArrowsAltV,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function ClientsList({ userDetails, alertMessage }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();
  // const [hideAlerts, setHideAlerts] = useState(true);
  const [render, setRender] = useState(false);
  // const [chosenTrainee, setChosenTrainee] = useState("");
  // const [clientDetails, setClientDetails] = useState({});
  // const [editMode, setEditMode] = useState(false);
  async function getRequests() {
    try {
      let requests = await axios.get(
        "/api/coach/requests/show/" + userDetails.id
      );
      return requests.data;
    } catch (err) {
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
      .catch((err) => console.log(err.response.data));
  }

  return (
    <div className="client-list-start">
      <h1>Clients</h1>
      <div className="ticket-list">
        {clients &&
          clients.map((item, index) => (
            <div className="ticket">
              <div className="ticket-header">
                <Link
                  to={"/coach/calendar/" + item.id}
                  className="view-calender"
                >
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    color="white"
                    className="fa-fa"
                  />
                </Link>
                {/* <button className="edit-button" onClick={handleEdit}>
                  {editing ? "SAVE" : "✏️"}
                </button> */}
                <span className={item.activity_level}>
                  {" " + item.activity_level}
                </span>
                <h3 className="ticket-title">{item.name}</h3>
              </div>
              <div className="ticket-content">
                <span className="first">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="white"
                    className="fa-fa"
                  />
                </span>
                <span>{" " + item.email}</span>
                <br />
                <span className="first">
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    color="white"
                    className="fa-fa"
                  />
                </span>
                <span>{" " + item.phone_number}</span>
                <br />
                <span className="first">
                  {/* <FontAwesomeIcon
                    icon={faGenderless}
                    color="white"
                    className="fa-fa"
                  /> */}
                  Gender:
                </span>
                <span>{" " + item.gender}</span>{" "}
                <span className="first">
                  {/* <FontAwesomeIcon
                    icon={faUser}
                    color="white"
                    className="fa-fa"
                  /> */}
                  Age:
                </span>
                <span>
                  {" " +
                    Math.abs(
                      new Date(
                        Date.now() - new Date(item.birthdate).getTime()
                      ).getUTCFullYear() - 1970
                    )}
                </span>
                <br />
                {/* <br /> */}
                <span className="first">
                  {/* <FontAwesomeIcon
                    icon={faWeight}
                    color="white"
                    className="fa-fa"
                  /> */}
                  Weight:
                </span>
                <span>{" " + item.weight}</span> {/* <br /> */}
                <span className="first">
                  {/* <FontAwesomeIcon
                    icon={faArrowsAltV}
                    color="white"
                    className="fa-fa"
                  /> */}
                  Height:
                </span>
                <span>{" " + item.height}</span>
                <br />
                <EditableInputInline
                  value={
                    item && item.daily_calorie_goal
                      ? item.daily_calorie_goal
                      : "no value"
                  }
                  attribute={"daily_calorie_goal"}
                  clients={clients}
                  setClients={setClients}
                  traineeId={item.id}
                  userDetails={userDetails}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ClientsList;
