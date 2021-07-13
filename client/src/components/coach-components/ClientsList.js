import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EditableInputInline from "../EditableInputInline";
import { Link } from "react-router-dom";
import { SetErrorContext } from "../../App";
import TraineeLogs from "../TraineeLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCalendarAlt,
  faEnvelope,
  faPhoneAlt,
  faTimes,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

function ClientsList({ userDetails, alertMessage }) {
  const [clients, setClients] = useState();
  const [render, setRender] = useState(false);
  const [chosenClient, setChosenClient] = useState();
  const setError = useContext(SetErrorContext);

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
    setClients(await getClients());
  }, [userDetails, render]);

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
                <button
                  className="show-logs-btn"
                  onClick={() => setChosenClient(item)}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faEye}
                    color="white"
                    className="fa-fa"
                  />
                </button>
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
                <span className="first">Gender:</span>
                <span>{" " + item.gender}</span> <br />
                <span className="first">Age:</span>
                <span>
                  {" " +
                    Math.abs(
                      new Date(
                        Date.now() - new Date(item.birthdate).getTime()
                      ).getUTCFullYear() - 1970
                    )}
                </span>
                <br />
                <span className="first">Weight:</span>
                <span>{" " + item.weight}</span> <br />
                <a href={`/chat/${item.id}/${userDetails.id}`}>
                  <button className="chat-client-btn">
                    {" "}
                    <FontAwesomeIcon
                      icon={faComment}
                      color="white"
                      className="fa-fa"
                    />
                  </button>
                </a>
                <span className="first">Height:</span>
                <span>{" " + item.height}</span>
              </div>
            </div>
          ))}
      </div>
      {chosenClient && (
        <div className="pop-up">
          <div className="pop-up-inner logs">
            <button className="popup-close" onClick={() => setChosenClient()}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <TraineeLogs type="Coach" userDetails={chosenClient} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientsList;
