import axios from "axios";
import React, { useEffect, useState, useHistory } from "react";

function TraineeDashboard({ signOut, userId }) {
  const history = useHistory();
  const [previousWorkouts,setPreviousWorkouts] = useState([]);
  
  const getWorkoutsLog = () => axios.get("/workout/show/" + userId).then(({data}) => {
    const workouts = data.map((workout, i) => {
      console.log(workout);
      setPreviousWorkouts(workouts)
    })
  } ).catch((err)=> {
    console.log(err);
  }) 

useEffect(() => {
    getWorkoutsLog();
     }, [userId]);

  return (
    <div>
      <h1>Trainee Dashboard</h1>
      <h2>My previous workouts:
        {previousWorkouts}
      </h2>
      <button onClick={() => signOut(history)}>Sign Out</button>
    </div>
  );
}

export default TraineeDashboard;
