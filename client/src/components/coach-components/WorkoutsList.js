import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditWorkoutPopup from "./EditWorkoutPopup";
import { SetErrorContext } from "../../App";

function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);
  const [shownWorkout, setShownWorkout] = useState();
  const [popupTrigger, setPopupTrigger] = useState(false);
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/workouts/show/" + userDetails.id)
      .then(({ data }) => setWorkouts(data))
      .catch((err) => console.log(err.response.data));
  }, [userDetails]);

  const handleRemove = (itemId) => {
    axios
      .delete(
        `/api/coach/workouts/delete/${userDetails.id}?workoutId=${itemId}`
      )
      .then(() => {
        setShownWorkout();
        setWorkouts([...workouts].filter((workout) => workout.id !== itemId));
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="create-workouts-start">
      {console.log(workouts)}
      <Link to="/coach/workouts/create">Create workout</Link>
      {userDetails && (
        <EditWorkoutPopup
          userDetails={userDetails}
          trigger={popupTrigger}
          setTrigger={setPopupTrigger}
          workout={shownWorkout}
          setWorkout={setShownWorkout}
        />
      )}
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
        {shownWorkout && (
          <div className="shown-workout">
            <h1 className="workout-name">{shownWorkout.name}</h1>
            <ol>
              {shownWorkout.exercises.map((item) => (
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
            <button onClick={() => handleRemove(shownWorkout.id)}>
              Remove
            </button>
            <button onClick={() => setPopupTrigger(true)}>edit</button>
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutsList;
