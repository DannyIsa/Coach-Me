import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/WeeklyCalendar.css";
import { SetErrorContext } from "../../App";

export default function WeeklyCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [chosenWorkout, setChosenWorkout] = useState();
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (userDetails) {
      axios
        .get(
          `http://localhost:3001/api/food/need-to-eat/${userDetails.coach_id}?traineeId=${userDetails.id}`
        )
        .then(({ data }) => {
          setNeedToEat(data);

          axios
            .get(
              `http://localhost:3001/api/trainee/workouts/show/${userDetails.coach_id}?traineeId=${userDetails.id}`
            )
            .then(({ data }) => {
              setWorkouts(data);
            })
            .catch((err) => {
              setError(err.response.data);
            });
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [userDetails]);

  const handleExerciseClicked = (workout) => {
    if (workout.exercises.length == 0) return;
    setChosenWorkout(workout);
  };

  const Meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const DaysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="weekly-calendar start">
      <table className="table">
        <thead>
          <tr>
            {DaysOfTheWeek.map((day, index) => (
              <td key={index} className="table-one-container">
                <h2 className="day-title">{day}</h2>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Meals.map((meal, mi) => (
            <tr key={mi}>
              {DaysOfTheWeek.map((day, di) => {
                let items = needToEat.filter(
                  (foodToEat) =>
                    foodToEat.day === day && foodToEat.meal_of_the_day === meal
                );
                return (
                  <td key={di}>
                    <div className="table-one-container">
                      <h3 className="container-title">{meal}</h3>
                      {items.map((item) => {
                        return <p>{item && item.name + " X" + item.amount}</p>;
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            {DaysOfTheWeek.map((day, index) => {
              let item = workouts.find((workout) => workout.day === day);
              return (
                <td key={index}>
                  <div className="table-one-container">
                    <h3 className="container-title">Workout</h3>
                    {item && (
                      <div onClick={() => handleExerciseClicked(item)}>
                        <h5>{item.name}</h5>
                      </div>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      {chosenWorkout && (
        <div className="popup-background">
          <div className="popup-workout">
            <button
              onClick={() => setChosenWorkout(false)}
              className="popup-close-button"
            >
              CLOSE
            </button>
            {chosenWorkout && (
              <Link to={`/trainee/workout/${chosenWorkout.id}`}>
                start workout
              </Link>
            )}
            <h1>{chosenWorkout.name}</h1>
            {chosenWorkout.exercises.map((exercise) => {
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}
