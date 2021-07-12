import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SetErrorContext } from "../../App";
import TraineeLogs from "../TraineeLogs";

function TraineeDashboard({ userDetails }) {
  const [wod, setWod] = useState({ done: false, workout: undefined });
  const [measured, setMeasured] = useState(false);
  const [eaten, setEaten] = useState(false);
  const setError = useContext(SetErrorContext);

  useEffect(async () => {
    if (!userDetails) return;
    try {
      const todayWorkout = await axios.get(
        "/api/logs/workout/check/" + userDetails.id
      );
      const todayMeasure = await axios.get(
        "/api/logs/measure/check/" + userDetails.id
      );
      const todayConsumption = await axios.get(
        "/api/logs/diet/check/" + userDetails.id
      );
      setWod(todayWorkout.data);
      setMeasured(todayMeasure.data);
      setEaten(todayConsumption.data);
    } catch (err) {
      setError(err.response.data);
    }
  }, [userDetails]);

  return (
    <div className="trainee-dashboard">
      {userDetails ? (
        <>
          <TraineeLogs userDetails={userDetails} type="Trainee" />
          <div className="workout2">
            <h2>Today's Workout: </h2>
            {wod.workout ? (
              wod.done ? (
                <h3>
                  No Workouts Remaining
                  <br /> For Today!
                </h3>
              ) : (
                <Link to={`/trainee/workout/${wod.workout.id}`}>
                  {wod.workout.name}
                </Link>
              )
            ) : (
              <h3>No Workouts Remaining For Today!</h3>
            )}
          </div>
          <div className="measured1">
            {measured ? (
              <h2>Measurements Registered!</h2>
            ) : (
              <Link to="/trainee/profile">Measure Yourself!</Link>
            )}
          </div>
          <div className="diet1">
            {eaten ? (
              <h2>Meals Registered!</h2>
            ) : (
              <>
                <h2>You Didn't Eat Today! </h2>
                <Link to="/trainee/profile">Please Register Your Meals!</Link>
              </>
            )}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeDashboard;
