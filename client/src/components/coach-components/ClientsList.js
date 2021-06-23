import axios from "axios";
import React, { useEffect, useState } from "react";

function ClientsList({ userDetails }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/requests/show/" + userDetails.id)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [userDetails]);
  return (
    <div>
      <h1>Your Clients:</h1>
    </div>
  );
}

export default ClientsList;
