import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CoachDashboard({ user, userId }) {
  const [details, setDetails] = useState();
  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:3001/api/coach/details/" + userId)
        .then(({ data }) => {
          setDetails(data);
        })
        .catch((e) => console.log(e));
    }
  }, [user, userId]);

  useEffect(() => {
    console.log(details);
  }, [details]);
  return (
    <div className="coach-dashboard">
      {details ? (
        <>
          <h1>{`Hello Coach ${details.name}`}</h1>

          <div className="dashboard-items">
            <Link to="/coach/clients">
              <div className="link-div">Your Trainees</div>
            </Link>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default CoachDashboard;
