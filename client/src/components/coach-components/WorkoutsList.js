import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);
  const [shownWorkout, setShownWorkout] = useState();

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/workouts/show/" + userDetails.id)
      .then(({ data }) => setWorkouts(data))
      .catch((err) => console.log(err.response.data));
  }, [userDetails]);

  useEffect(() => {
    console.log(shownWorkout);
  }, [shownWorkout]);
  return (
    <div className="create-workouts-start">
      <Link to="/coach/workouts/create">Create workout</Link>
      <h1>Your Workouts:</h1>
      <div className="workouts-list">
        {workouts.map((item, index) => (
          <h1 key={"workout" + index} onClick={() => setShownWorkout(item)}>
            {item.name}
          </h1>
        ))}
      </div>
      <br />
      {shownWorkout && (
        <div className="shown-workout">
          <h1 className="workout-name">{shownWorkout.name}</h1>
          <h1 className="workout-name">{shownWorkout.name}</h1>
          <h1 className="workout-name">{shownWorkout.name}</h1>
          <h1 className="workout-name">{shownWorkout.name}</h1>
        </div>
      )}
    </div>
  );
}

export default WorkoutsList;
