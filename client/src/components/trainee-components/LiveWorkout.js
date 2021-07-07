import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SetErrorContext } from "../../App";
import WorkoutTimer from "./WorkoutTimer";

function LiveWorkout({ userDetails }) {
  const [currentWorkout, setCurrentWorkout] = useState();
  const { workoutId } = useParams();
  const setError = useContext(SetErrorContext);

  const getWorkout = () => {
    if (userDetails) {
      axios
        .get(`http://localhost:3001/api/trainee/workouts/show/${workoutId}`)
        .then(({ data }) => {
          // setCurrentWorkout(data);
          console.log(data, "AAAAAAAAAA");
        })
        .catch((err) => {
          setError(err.response.data);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (userDetails && workoutId) {
      console.log(userDetails);
      getWorkout();
    }
  }, [userDetails, workoutId]);

  return (
    <div>
      <h1>LiveWorkout </h1>
      <WorkoutTimer />

      <h1>{currentWorkout}</h1>
      {/* {chosenWorkout.exercises.map((exercise) => {
        return (
          <div>
            <h3>{exercise.name}</h3>
            <p>Sets: {exercise.sets}</p>
            <p>Minimum reps: {exercise.min_reps}</p>
            <p>Maximum reps: {exercise.max_reps}</p>
            <p>Adeed weight: {exercise.added_weight}</p>
            <p>Rest: {exercise.rest}</p>
          </div>
        );
      })} */}
    </div>
  );
}

export default LiveWorkout;
