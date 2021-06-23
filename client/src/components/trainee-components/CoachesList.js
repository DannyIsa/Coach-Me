import axios from "axios";
import React, { useEffect, useState } from "react";
import {} from "react-router-dom";

function CoachesList({ userId, signOut }) {
  const [clients, setClients] = useState();
  const [requests, setRequests] = useState();

  useEffect(async () => {
    if (!userId) return;
    const requests = await axios.get("/api/coach/requests/show/" + userId);
  }, [userId]);
  return (
    <div>
      <h1>Coaches:</h1>
    </div>
  );
}

export default CoachesList;
