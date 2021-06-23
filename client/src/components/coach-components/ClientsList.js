import axios from "axios";
import React, { useEffect, useState } from "react";

function ClientsList({ userDetails }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();
  const [hideAlerts, setHideAlerts] = useState(true);

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/requests/show/" + userDetails.id)
      .then(({ data }) => {
        setRequests(data);
      })
      .catch((err) => console.log(err));
  }, [userDetails]);
  return (
    <div>
      <div
        className="requests-alert"
        onClick={() => setHideAlerts(!hideAlerts)}
      >{`${requests ? requests.length : 0} alerts`}</div>
      <div className="alerts-div" hidden={hideAlerts}>
        {requests &&
          requests.map((item, index) => (
            <div className="alert" key={"alert" + index}>
              {item.name}
              <br />
              {item.content}
              <br />
              {new Date(item.updatedAt).toLocaleDateString("it-IT") +
                ", " +
                new Date(item.updatedAt).toLocaleTimeString("it-IT")}
            </div>
          ))}
      </div>
      <h1>Your Clients:</h1>
    </div>
  );
}

export default ClientsList;
