import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SetErrorContext } from "../../App";
import LiveWorkout from "./LiveWorkout";

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
          <Link to="/trainee/workout/:workoutId">start workout</Link>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeDashboard;
