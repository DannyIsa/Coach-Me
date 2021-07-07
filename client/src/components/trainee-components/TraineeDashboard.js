import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SetErrorContext } from "../../App";

function TraineeDashboard({ userDetails }) {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [measureLogs, setMeasureLogs] = useState([]);
  const [dietLogs, setDietLogs] = useState([]);
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (!userDetails) return;
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
