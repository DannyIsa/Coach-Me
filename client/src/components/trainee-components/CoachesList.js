import axios from "axios";
import React, { useEffect, useState } from "react";
import {} from "react-router-dom";

function CoachesList({ userDetails }) {
  const [coaches, setCoaches] = useState();
  useEffect(async () => {
    if (!userDetails) return;
    let { data } = await axios.get("/api/coach/show/all");
    setCoaches(data);
  }, [userDetails]);

  return (
    <div>
      <h1>Coaches:</h1>
      {coaches &&
        coaches.map((item, index) => <h3 key={index}>{item.email}</h3>)}
    </div>
  );
}

export default CoachesList;
