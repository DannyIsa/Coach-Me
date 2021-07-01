import axios from "axios";
import React, { useEffect, useState } from "react";

function ClientsList({ userDetails, alertMessage }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();
  const [hideAlerts, setHideAlerts] = useState(true);
  const [render, setRender] = useState(false);
  const [chosenTrainee, setChosenTrainee] = useState("");

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
      <div
        className="requests-alert"
        onClick={() => setHideAlerts(!hideAlerts)}
      >{`${requests ? requests.length : 0} alerts`}</div>
      <div className="alerts-div" hidden={hideAlerts}>
        {requests &&
          requests.map((item, index) => (
            <div className="alert" key={"alert" + index}>
              {item.trainee_name}
              <br />
              {item.content}
              <br />
              {new Date(item.updatedAt).toLocaleDateString("it-IT") +
                ", " +
                new Date(item.updatedAt).toLocaleTimeString("it-IT")}
              <br />
              <button onClick={() => handleRequest(true, item.trainee_id)}>
                Accept
              </button>
              <button onClick={() => handleRequest(false, item.trainee_id)}>
                Decline
              </button>
            </div>
          ))}
      </div>
      <h1>Your Clients:</h1>
      <div className="clients-list">
        {clients &&
          clients.map((item, index) => (
            <div
              className="client-div"
              key={"client" + index}
              onClick={() => {
                setChosenTrainee(item);
                console.log(item);
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ClientsList;
