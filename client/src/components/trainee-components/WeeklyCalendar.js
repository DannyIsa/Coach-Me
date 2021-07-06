import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeeklyCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [chosen, setChosen] = useState();

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
                let items = needToEat.filter(
                  (foodToEat) =>
                    foodToEat.day === day && foodToEat.meal_of_the_day === meal
                );
                return (
                  <td key={di}>
                    {meal +
                      " " +
                      items.map((item) =>
                        item ? "\n" + item.name + " X" + item.amount : ""
                      )}
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
                  {"Workout" + (item ? ":\n" + item.name : "")}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div className="details-div"></div>
    </div>
  );
}
