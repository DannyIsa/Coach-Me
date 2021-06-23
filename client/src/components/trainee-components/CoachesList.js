import axios from "axios";
import React, { useEffect, useState } from "react";
import {} from "react-router-dom";

function CoachesList({ userId, signOut }) {
  const [coaches, setCoaches] = useState();

  useEffect(async () => {
    if (!userId) return;
    let { data } = await axios.get("/api/coach/show/all");
    setCoaches(data);
  }, [userId]);
  return (
    <div>
      <h1>Coaches:</h1>
      {coaches && coaches.map((item) => <h3>{item.email}</h3>)}
    </div>
  );
}

export default CoachesList;
