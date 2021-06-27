import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {});
  return (
    <div>
      <Link to="/coach/workouts/create">Create workout</Link>
      <h1>Your Workouts:</h1>
      <div className="workouts-list">
        {workouts.map((item, index) => item.name)}
      </div>
    </div>
  );
}

export default WorkoutsList;
