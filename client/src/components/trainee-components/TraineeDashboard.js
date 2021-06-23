import axios from "axios";
import React, { useEffect, useState } from "react";

function TraineeDashboard({ userDetails }) {
  const [previousWorkouts, setPreviousWorkouts] = useState([]);

  const getWorkoutsLog = () =>
    axios
      .get("/api/log/workout/show/" + userDetails.id)
      .then(({ data }) => {
        const workouts = data.map((workout, i) => {
          console.log(workout);
          setPreviousWorkouts(workouts);
        });
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    if (userDetails) getWorkoutsLog();
  }, [userDetails]);

  return (
    <div>
      <h1>Trainee Dashboard</h1>
      <h2>
        My previous workouts:
        {previousWorkouts}
      </h2>
    </div>
  );
}

export default TraineeDashboard;

{
  /* <Link to="/trainee/coaches">Coaches</Link> */
}
