import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);
  const [shownWorkoutExercises, setShownWorkoutExercises] = useState();
  const [shownWorkout, setShownWorkout] = useState();

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/workouts/show/" + userDetails.id)
      .then(({ data }) => setWorkouts(data))
      .catch((err) => console.log(err.response.data));
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && shownWorkout) {
      axios
        .get(
          `/api/coach/workouts/show-exercises/${userDetails.id}?workoutId=${shownWorkout.id}`
        )
        .then(({ data }) => setShownWorkoutExercises(data))
        .catch((err) => console.log(err.response.data));
    }
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
      {shownWorkout && shownWorkoutExercises && (
        <div className="shown-workout">
          <h1 className="workout-name">{shownWorkout.name}</h1>
          {shownWorkoutExercises.map((item) => (
            <h3 className="exercise-name">{item.name}</h3>
          ))}
          <br />
        </div>
      )}
    </div>
  );
}

export default WorkoutsList;
