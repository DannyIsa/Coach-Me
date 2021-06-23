import axios from "axios";
import React, { useEffect, useState } from "react";

function ClientsList({ userId }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();

  useEffect(() => {
    if (!userId) return;
    axios
      .get("/api/coach/requests/show/" + userId)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  return (
    <div>
      <h1>Your Clients:</h1>
    </div>
  );
}

export default ClientsList;
