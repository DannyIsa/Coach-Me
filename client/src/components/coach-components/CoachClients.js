import axios from "axios";
import React, { useEffect, useState } from "react";

function CoachClients({ userId }) {
  const [clients, setClients] = useState();
  useEffect(() => {
    if (!userId) return;
    axios.get("http://localhost:3001/api/coach/");
  }, [userId]);
  return (
    <div>
      <h1>Your Clients:</h1>
    </div>
  );
}

export default CoachClients;
