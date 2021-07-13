import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SetErrorContext } from "../../App";
import TraineeLogs from "../TraineeLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
          <div className="dash-con">
            <div className="dash-header">
              <span>Dashboard</span>
              <h3>{userDetails.name}</h3>
            </div>
            <Link to="/trainee/calendar" className="trainee-calendar">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="fi-fi"
                color="#252525f7"
              />
            </Link>
          </div>
          <div className="helpers">
            <div className="workout2">
              <span>Today's Workout</span>
              {wod.workout ? (
                wod.done ? (
                  <span>
                    No Workouts Remaining
                    <br /> For Today!
                  </span>
                ) : (
                  <Link to={`/trainee/workout/${wod.workout.id}`}>
                    <h3>{wod.workout.name}</h3>
                  </Link>
                )
              ) : (
                <span>No Workouts Remaining For Today!</span>
              )}
            </div>
            <div className="measured1">
              {measured ? (
                <span>Measurements Registered!</span>
              ) : (
                <Link to="/trainee/profile">
                  <h3>Measure Yourself!</h3>
                </Link>
              )}
            </div>
            <div className="diet1">
              {eaten ? (
                <span>Meals Registered!</span>
              ) : (
                <>
                  <h3>You Didn't Eat Today! </h3>
                  <Link to="/trainee/food">
                    <h3>Please Register Your Meals!</h3>
                  </Link>
                </>
              )}
            </div>
          </div>
          <TraineeLogs userDetails={userDetails} type="Trainee" />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeDashboard;
