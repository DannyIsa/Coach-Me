import React from "react";
import { Link } from "react-router-dom";

function TraineeDashboard({ userDetails }) {
  return (
    <div className="coach-dashboard">
      {userDetails ? (
        <>
          <h1>{`Hello Trainee ${userDetails.name}`}</h1>
          <Link to="/trainee/calendar">Weekly Calendar</Link>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeDashboard;
