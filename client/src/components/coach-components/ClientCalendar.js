import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ClientCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { traineeId } = useParams();
  const [field, setField] = useState();
  const [changes, setChanges] = useState({});

  useEffect(() => {
    if (userDetails) {
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
                  <td key={di} onClick={() => setField({ type: meal, day })}>
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
      {field && (
        <div>
          Search Div:
          {field.type + " " + field.day}
        </div>
      )}
    </div>
  );
}
export default ClientCalendar;
