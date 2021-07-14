import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { SetErrorContext } from "../../App";
import "../../styles/LiveWorkout.css";
import WorkoutTimer from "./WorkoutTimer";

function LiveWorkout({ userDetails }) {
  const [currentWorkout, setCurrentWorkout] = useState();
  const [timeArray, setTimeArray] = useState();
  const [index, setIndex] = useState(0);
  const [ended, setEnded] = useState(false);
  const [currentExercise, setCurrentExercise] = useState();
  const { workoutId } = useParams();
  const history = useHistory();
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
    if (!currentWorkout) return;
    let restArray = splitArray("rest");
    let idArray = splitArray("id");
    setTimeArray({ restArray, idArray });
  }, [currentWorkout]);

  useEffect(() => {
    if (!timeArray || !currentWorkout) return;
    setCurrentExercise(
      currentWorkout.exercises.find(
        (exercise) => exercise.id === timeArray.idArray[index]
      )
    );
  }, [index, timeArray, currentWorkout]);

  return (
    <div className="live-workout-page">
      {currentWorkout && timeArray && (
        <div className="workout-details-div">
          <h1 className="header">{currentWorkout.name}</h1>
          {currentExercise && (
            <div className="show-div">
              <div className="current-exercise">
                <div className="current-exercise-img">
                  <img src={currentExercise.image} alt={currentExercise.name} />
                </div>
                <div className="current-exercise-details">
                  <h1 className="exercise-name">{currentExercise.name}</h1>
                  <h2 className="exercise-details">{`${
                    currentExercise.min_reps
                  } ${
                    currentExercise.min_reps !== currentExercise.max_reps
                      ? "-" + currentExercise.max_reps
                      : ""
                  } reps, rest for ${currentExercise.rest}s ${
                    currentExercise.added_weight > 0
                      ? "+" + currentExercise.added_weight + "kg "
                      : ""
                  }X${currentExercise.sets}`}</h2>
                </div>
              </div>
              {timeArray && !ended ? (
                <div className="timer-div">
                  <WorkoutTimer
                    rest={timeArray.restArray[index]}
                    index={index}
                    raiseIndex={() => {
                      if (index < timeArray.restArray.length - 1)
                        setIndex(index + 1);
                      else setEnded(true);
                    }}
                  />
                  <p className="workout-sets">
                    {"sets:" +
                      Math.ceil(
                        (timeArray.idArray.length - index) /
                          (timeArray.idArray.length / currentWorkout.sets)
                      ) +
                      "/" +
                      currentWorkout.sets}
                  </p>
                </div>
              ) : (
                <div className="workout-ended">
                  <h1>Workout Ended</h1>
                  <button
                    onClick={() => {
                      axios
                        .post("/api/logs/workout/add/" + userDetails.id, {
                          workoutId: currentWorkout.id,
                        })
                        .then(() => {
                          history.push("/trainee/calendar");
                        })
                        .catch((err) => setError(err.response.data));
                    }}
                  >
                    Submit Workout
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="exercises-list">
            {currentExercise &&
              currentWorkout.exercises.map((exercise) => {
                return (
                  <div
                    className={
                      currentExercise.id === exercise.id
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
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveWorkout;
