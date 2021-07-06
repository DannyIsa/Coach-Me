import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TraineeDashboard({ userDetails }) {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [measureLogs, setMeasureLogs] = useState([]);
  const [dietLogs, setDietLogs] = useState([]);

  useEffect(() => {
    if (!userDetails) return;
    axios.get("/api/")
  }, [userDetails]);
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
