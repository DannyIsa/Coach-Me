import axios from "axios";
import React, { useEffect, useState } from "react";
import EditableInput from "../EditableInput";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ClientsList({ userDetails, alertMessage }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();
  const [hideAlerts, setHideAlerts] = useState(true);
  const [render, setRender] = useState(false);
  const [chosenTrainee, setChosenTrainee] = useState("");
  const [clientDetails, setClientDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
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

  const handleEdit = () => {
    if (!editMode) {
      setEditMode(!editMode);
      return;
    } else {
      axios
        .put(
          "http://localhost:3001/api/coach/clients/update/" + userDetails.id,
          {
            traineeId: chosenTrainee.id,
            goal: clientDetails.daily_calorie_goal,
          }
        )
        .then(({ data }) => {
          setChosenTrainee(data);
          setEditMode(!editMode);
        })
        .catch((err) => console.log(err.response.data));
    }
  };

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
      <h1>Your Clients:</h1>
      <div className="img-container">
        {clients &&
          clients.map((item, index) => (
            //  <div className="img-block">
            <div
              className="img-mini"
              key={"client" + index}
              onClick={() => setChosenTrainee(item)}
            >
              {/* <img class="img__img" src="http://placehold.it/257x200.jpg" /> */}
              {item.name}
            </div>
          ))}
        {chosenTrainee && (
          <div className="img-description">
            <div className="trainee-details">
              <span className="first">Name:</span>
              <span>{" " + chosenTrainee.name}</span>
              <br />
              {/* <h2>{"Name: " + chosenTrainee.name}</h2> */}
              {/* <h2>{"Email: " + chosenTrainee.email}</h2> */}
              <span className="first">Email:</span>
              <span>{" " + chosenTrainee.email}</span>
              <br />
              {/* <h2>{"Phone Number :" + chosenTrainee.phone_number}</h2> */}
              <span className="first">Phone Number:</span>
              <span>{" " + chosenTrainee.phone_number}</span>
              <br />
              {/* <h2>
                {"Age: " +
                  Math.abs(
                    new Date(
                      Date.now() - new Date(chosenTrainee.birthdate).getTime()
                    ).getUTCFullYear() - 1970
                  )}
              </h2> */}
              <span className="first">Age:</span>
              <span>
                {" " +
                  Math.abs(
                    new Date(
                      Date.now() - new Date(chosenTrainee.birthdate).getTime()
                    ).getUTCFullYear() - 1970
                  )}
              </span>
              <br />
              {/* <h2>{"Gender: " + chosenTrainee.gender}</h2> */}
              <span className="first">Gender:</span>
              <span>{" " + chosenTrainee.gender}</span>
              <br />
              {/* <h2>{"Weight: " + chosenTrainee.weight}</h2> */}
              <span className="first">Weight:</span>
              <span>{" " + chosenTrainee.weight}</span>
              <br />
              {/* <h2>{"Height: " + chosenTrainee.height}</h2> */}
              <span className="first">Height:</span>
              <span>{" " + chosenTrainee.height}</span>
              <br />

              <EditableInput
                value={
                  chosenTrainee && chosenTrainee.daily_calorie_goal
                    ? chosenTrainee.daily_calorie_goal
                    : "no value"
                }
                attribute={"daily_calorie_goal"}
                editing={editMode}
                state={clientDetails}
                setState={setClientDetails}
              />
              {/* <h2>{"Activity Level: " + chosenTrainee.activity_level}</h2> */}
              <span className="first">Activity Level:</span>
              <span>{" " + chosenTrainee.activity_level}</span>
              <br />
            </div>
            <Link
              to={"/coach/calendar/" + chosenTrainee.id}
              className="view-calender"
            >
              View Calendar
            </Link>
            <div>
              <button onClick={() => setChosenTrainee("")}>
                {" "}
                <FontAwesomeIcon
                  icon={faTimes}
                  color="#acacac"
                  className="fa-fa"
                />
              </button>
              <button onClick={handleEdit}>{editMode ? "✔" : "✎"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientsList;
