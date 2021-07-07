import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SetErrorContext } from "../../App";
import "../../styles/LiveWorkout.css";
import WorkoutTimer from "./WorkoutTimer";

function LiveWorkout({ userDetails }) {
  const [currentWorkout, setCurrentWorkout] = useState();
  const { workoutId } = useParams();
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (userDetails && workoutId) {
      axios
        .get(
          `/api/trainee/workout/show/one/${workoutId}?traineeId=${userDetails.id}&coachId=${userDetails.coach_id}`
        )
        .then(({ data }) => {
          setCurrentWorkout(data);
          console.log(data, "AAAAAAAAAA");
        })
        .catch((err) => {
          //   setError(err.response.data);
          console.log(err);
        });
    }
  }, [userDetails, workoutId]);

  return (
    <div>
      {currentWorkout && (
        <div>
          <h2 className="header">Today's Workout - {currentWorkout.name}</h2>
          <WorkoutTimer />
          <div className="exerciseContainer">
            {currentWorkout.exercises.map((exercise) => {
              return (
                <div className="exercise">
                  <p> {exercise.name} </p>
                  <p>Sets: {exercise.sets}</p>
                  <p>
                    reps: {exercise.min_reps} - {exercise.max_reps}{" "}
                  </p>
                  <p>Adeed weight: {exercise.added_weight}</p>
                  <p>Rest: {exercise.rest}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveWorkout;
