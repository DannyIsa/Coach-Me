import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TraineeDashboard({ userDetails }) {
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [measureLogs, setMeasureLogs] = useState([]);

  const getWorkoutsLog = () =>
    axios
      .get("http://localhost:3001/api/logs/workout/show/" + userDetails.id)
      .then(({ data }) => {
        if (data) {
          const workouts = data.map((workout, i) => {
            const workoutName = workout.name;
            setPreviousWorkouts((previousWorkouts) => [
              ...previousWorkouts,
              workoutName,
            ]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

  const getMesuarments = () =>
    axios
      .get("http://localhost:3001/api/logs/measure/show/" + userDetails.id)
      .then(({ data }) => {
        if (data) {
          const measurements = data.map((log, i) => {
            console.log(log, "log");
            setMeasureLogs(log);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    if (!userDetails) return;
    getWorkoutsLog();
    getMesuarments();
  }, [userDetails]);

  return (
    <div>
      {userDetails ? (
        <>
          <h1>{userDetails.name}</h1>
          <h1>{userDetails.email}</h1>
          <br />
          <h2>Personal info:</h2>
          <div>Email: {userDetails.email}</div>
          <div>birthdate: {userDetails.birthdate}</div>
          <div>Goal: {}</div>
          <div>Activity Level: {}</div>
          <div>Workouts Per Week: {}</div>
          <br />
          <h2>Body Measurments:</h2>
          <div>Height: {userDetails.height} cm</div>
          <div>Weight: {userDetails.weight} kg</div>
          <div>Chest: {measureLogs.chest_perimeter} cm</div>
          <div>Hip: {measureLogs.hip_perimeter} cm</div>
          <div>Bicep: {measureLogs.bicep_perimeter} cm</div>
          <div>Thigh: {measureLogs.thigh_perimeter} cm</div>
          <div>Waist: {measureLogs.waist_perimeter} cm</div>
          <br />
          <h2>Forms To Fill Out:</h2>
          <div>daily general update</div>
          <div>health declaration</div>
          <br />
          <h2>
            My Next Workout:
            {previousWorkouts}
          </h2>
          {/* <Link to="/trainee/coaches">Coaches List</Link> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default TraineeDashboard;

{
  /* <Link to="/trainee/coaches">Coaches</Link> */
}
