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
      <br />
      <div className="content">
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
            <ol>
              {shownWorkoutExercises.map((item) => (
                <li className="exercise-block">
                  <h2 className="exercise-name">{item.name}</h2>
                  <h3 className="exercise-details">{`${item.min_reps} ${
                    item.min_reps !== item.max_reps ? "-" + item.max_reps : ""
                  } reps, rest for ${item.rest}s ${
                    item.added_weight > 0 ? "+" + item.added_weight + "kg " : ""
                  }X${item.sets}`}</h3>
                </li>
              ))}
            </ol>
            <h1>{"X" + shownWorkout.sets}</h1>
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutsList;
