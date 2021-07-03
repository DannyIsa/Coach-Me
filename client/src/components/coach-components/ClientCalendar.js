import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ClientCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { traineeId } = useParams();
  const [field, setField] = useState({ day: null, type: null });
  const [results, setResults] = useState([]);
  const [chosen, setChosen] = useState({});
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (userDetails && traineeId) {
      axios
        .get(
          `http://localhost:3001/api/food/need-to-eat/${userDetails.id}?traineeId=${traineeId}`
        )
        .then(({ data }) => {
          setNeedToEat(data);
          axios
            .get(
              `http://localhost:3001/api/trainee/workouts/show/${userDetails.id}?traineeId=${traineeId}`
            )
            .then(({ data }) => {
              setWorkouts(data);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [userDetails]);

  useEffect(() => {
    console.log(chosen, field);
  }, [chosen]);

  useEffect(() => {
    if (!field || !userDetails) return;
    if (field.type === "Workout") {
      axios
        .get(
          `/api/coach/workouts/show/${userDetails.id}?field=name&value=${searchInput}`
        )
        .then(({ data }) => {
          setResults(data);
          setChosen();
        })
        .catch((err) => {
          setResults([]);
          setChosen();
          console.log(err.response.data);
        });
    } else {
      setResults([]);
      setChosen();
    }
  }, [searchInput, field]);

  const addItem=async()=>{

  }

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
              <td key={index}>
                <h2>{day}</h2>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Meals.map((meal, mi) => (
            <tr key={mi}>
              {DaysOfTheWeek.map((day, di) => {
                let item = needToEat.find(
                  (foodToEat) =>
                    foodToEat.day === day && foodToEat.meal_of_the_day === meal
                );
                return (
                  <td
                    key={di}
                    onClick={() => setField({ type: meal, day })}
                    className={
                      field.day === day && field.type === meal && "chosen"
                    }
                  >
                    {meal + " " + (item ? JSON.stringify(item) : "")}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            {DaysOfTheWeek.map((day, index) => {
              let item = workouts.find((workout) => workout.day === day);
              return (
                <td
                  className={
                    field.day === day && field.type === "Workout" && "chosen"
                  }
                  key={index}
                  onClick={() => setField({ type: "Workout", day })}
                >
                  {"workout" + (item ? item.name : "")}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      {field.type && (
        <div>
          Searching for {field.type}
          <br />
          {
            <div className="control-div">
              <div className="search-div">
                <input
                  className="search-input"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="results">
                  {results.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setChosen(item)}
                      className={
                        chosen && chosen.name === item.name && "chosen"
                      }
                    >
                      {item.name}
                      <br />
                    </div>
                  ))}
                </div>
              </div>
              {field.type === "Workout" && chosen && (
                <div className="details-div">
                  <h1 className="workout-name">{chosen.name}</h1>
                  <ol>
                    {chosen.exercises.map((item) => (
                      <li className="exercise-block">
                        <h2 className="exercise-name">{item.name}</h2>
                        <h3 className="exercise-details">{`${item.min_reps} ${
                          item.min_reps !== item.max_reps
                            ? "-" + item.max_reps
                            : ""
                        } reps, rest for ${item.rest}s ${
                          item.added_weight > 0
                            ? "+" + item.added_weight + "kg "
                            : ""
                        }X${item.sets}`}</h3>
                      </li>
                    ))}
                  </ol>
                  <h1>{"X" + chosen.sets}</h1>
                  <button onClick={()=>{addItem()}}>Add</button>
                </div>
              )}
            </div>
          }
        </div>
      )}
    </div>
  );
}
export default ClientCalendar;
