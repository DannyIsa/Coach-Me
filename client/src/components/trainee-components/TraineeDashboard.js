import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TraineeDashboard({ userDetails }) {
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [dietLog, setDietLog] = useState([]);

  const getWorkoutsLog = () =>
    axios
      .get("http://localhost:3001/api/logs/workout/show/" + userDetails)
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

  // console.log(previousWorkouts, "after");
  // const getdietLog = () =>
  //   axios
  //     .get("http://localhost:3001/api/logs/diet/show/" + userDetails)
  //     .then(({ data }) => {
  //       if (data) {
  //         console.log(data);
  //         const dietLog = data.map((log, i) => {
  //           console.log(log);
  //           setDietLog(dietLog);
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  useEffect(() => {
    getWorkoutsLog();
    // getdietLog();
  }, [userDetails]);

  return (
    <div>
      <h1>Trainee Dashboard</h1>
      <h2>
        My previous workouts:
        {previousWorkouts}
      </h2>
      <Link to="/trainee/coaches">Coaches List</Link>
    </div>
  );
}

export default TraineeDashboard;

{
  /* <Link to="/trainee/coaches">Coaches</Link> */
}
