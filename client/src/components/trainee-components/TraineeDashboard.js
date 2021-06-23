import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TraineeDashboard({ signOut, userId }) {
  // const history = useHistory();
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [dietLog, setDietLog] = useState([]);

  const getWorkoutsLog = () =>
    axios
      .get("http://localhost:3001/api/logs/workout/show/" + userId)
      .then(({ data }) => {
        if (data) {
          console.log(data);
          const workouts = data.map((workout, i) => {
            console.log(workout);
            setPreviousWorkouts(workouts);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    getWorkoutsLog();
  }, [userId]);

  const getdietLog = () =>
    axios
      .get("http://localhost:3001/api/logs/diet/show/" + userId)
      .then(({ data }) => {
        if (data) {
          console.log(data);
          const dietLog = data.map((log, i) => {
            console.log(log);
            setDietLog(dietLog);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    getdietLog();
  }, [userId]);

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
