import axios from "axios";
import React, { useEffect, useState } from "react";
import EditableInput from "../EditableInput";
import { Link } from "react-router-dom";

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
      <div className="clients-list">
        {clients &&
          clients.map((item, index) => (
            <div
              className="client-div"
              key={"client" + index}
              onClick={() => setChosenTrainee(item)}
            >
              {item.name}
            </div>
          ))}
        {chosenTrainee && (
          <>
            <button onClick={() => setChosenTrainee("")}>CLOSE</button>
            <button onClick={handleEdit}>{editMode ? "Save" : "Edit"}</button>
            <div className="trainee-details">
              <h2>{"Name: " + chosenTrainee.name}</h2>
              <h2>{"Email: " + chosenTrainee.email}</h2>
              <h2>{"Phone Number :" + chosenTrainee.phone_number}</h2>
              <h2>
                {"Age: " +
                  Math.abs(
                    new Date(
                      Date.now() - new Date(chosenTrainee.birthdate).getTime()
                    ).getUTCFullYear() - 1970
                  )}
              </h2>
              <h2>{"Gender: " + chosenTrainee.gender}</h2>
              <h2>{"Weight: " + chosenTrainee.weight}</h2>
              <h2>{"Height: " + chosenTrainee.height}</h2>
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
              <h2>{"Activity Level: " + chosenTrainee.activity_level}</h2>
            </div>
            <Link to={"/coach/calendar/" + chosenTrainee.id}>
              View Calendar
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ClientsList;
