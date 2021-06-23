import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function CoachDashboard({ user, userId, signOut }) {
  const history = useHistory();
  const [details, setDetails] = useState();
  useEffect(() => {
    if (userId) {
      console.log("yes");
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

          <button onClick={() => signOut(history)}>Sign Out</button>

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
