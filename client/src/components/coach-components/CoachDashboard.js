import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CoachDashboard({ userDetails }) {
  useEffect(() => {
    console.log("yes");
  }, []);
  return (
    <div className="coach-dashboard">
      {userDetails ? (
        <>
          <h1>{`Hello Coach ${userDetails.name}`}</h1>

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
