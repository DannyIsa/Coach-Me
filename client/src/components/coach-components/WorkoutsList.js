import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/workouts/show/" + 80)
      .then(({ data }) => setWorkouts(data))
      .catch((err) => console.log(err.response.data));
  }, [userDetails]);
  return (
    <div>
      <Link to="/coach/workouts/create">Create workout</Link>
      <h1>Your Workouts:</h1>
      {workouts.map((item, index) => (
        <h1 key={"workout" + index}>{item.name}</h1>
      ))}
      <div className="workouts-list"></div>
    </div>
  );
}

export default WorkoutsList;
