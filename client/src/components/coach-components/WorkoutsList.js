import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {});
  return (
    // <div>
    <div className="create-workouts-start">
      <div className="workoutsHeader">
        <Link to="/coach/workouts/create">Create workout</Link>
        <h1>Your Workouts:</h1>
      </div>
      <div className="workouts-list">
        {workouts.map((item, index) => item.name)}
      </div>
    </div>
    // </div>
  );
}

export default WorkoutsList;
