import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SetErrorContext } from "../../App";
import "../../styles/LiveWorkout.css";
import WorkoutTimer from "./WorkoutTimer";

function LiveWorkout({ userDetails }) {
  const [currentWorkout, setCurrentWorkout] = useState();
  const [timeArray, setTimeArray] = useState();
  const [index, setIndex] = useState(0);
  const [ended, setEnded] = useState(false);
  const { workoutId } = useParams();
  const setError = useContext(SetErrorContext);

  const splitArray = (attribute) => {
    let arr = currentWorkout.exercises
      .map((exercise) => {
        let item = String(exercise[attribute] + " ").repeat(exercise.sets);
        item = item.slice(0, item.length - 1);
        return item;
      })
      .join(" ");
    arr = (arr + " ").repeat(currentWorkout.sets);
    arr = arr.split(" ");
    arr = arr.map((item) => Number(item));
    arr.pop();
    return arr;
  };

  useEffect(() => {
    if (userDetails && workoutId) {
      axios
        .get(
          `/api/trainee/workout/show/one/${workoutId}?traineeId=${userDetails.id}&coachId=${userDetails.coach_id}`
        )
        .then(({ data }) => {
          setCurrentWorkout(data);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [userDetails, workoutId]);

  useEffect(() => {
    console.log(ended);
  }, [ended]);
  useEffect(() => {
    if (!currentWorkout) return;
    let restArray = splitArray("rest");
    let idArray = splitArray("id");
    setTimeArray({ restArray, idArray });
  }, [currentWorkout]);

  return (
    <div className="live-workout-page">
      <h1 className="header">LiveWorkout </h1>

      {timeArray && !ended ? (
        <WorkoutTimer
          rest={timeArray.restArray[index]}
          index={index}
          raiseIndex={() => {
            if (index < timeArray.restArray.length - 1) setIndex(index + 1);
            else setEnded(true);
          }}
        />
      ) : (
        <>
          <h1>Workout Ended</h1>
          <button>Submit Workout</button>
        </>
      )}
      {currentWorkout && timeArray && (
        <div className="workout-details-div">
          <h1>{currentWorkout.name}</h1>
          {currentWorkout.exercises.map((exercise) => {
            return (
              <div
                className={
                  timeArray.idArray[index] === exercise.id
                    ? "working exercise"
                    : "exercise"
                }
              >
                <img src={exercise.image} alt={exercise.name} />
                <h3>{exercise.name}</h3>
                <p>Sets: {exercise.sets}</p>
                <p>Minimum reps: {exercise.min_reps}</p>
                <p>Maximum reps: {exercise.max_reps}</p>
                <p>Adeed weight: {exercise.added_weight}</p>
                <p>Rest: {exercise.rest}</p>
              </div>
            );
          })}
          <h3>{"X" + currentWorkout.sets}</h3>
        </div>
      )}
    </div>
  );
}

export default LiveWorkout;
