import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeeklyCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (userDetails) {
      axios
        .get(`http://localhost:3001/api/food/need-to-eat/${userDetails.id}`)
        .then(({ data }) => {
          setNeedToEat(data);
          axios
            .get(
              `http://localhost:3001/api/trainee/workouts/show/${userDetails.id}`
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
          {MEALS.map((meal, mi) => (
            <tr key={mi}>
              {DaysOfTheWeek.map((day, di) => {
                let item = needToEat.find(
                  (foodToEat) =>
                    foodToEat.day === day && foodToEat.meal_of_the_day === meal
                );
                return (
                  <td key={di}>
                    {meal + " " + (item ? JSON.stringify(item) : "")}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            {DaysOfTheWeek.map((day, index) => {
              let item = workouts.find((workout) => workout.day === day);
              return <td key={index}>{"workout" + (item ? item.name : "")}</td>;
            })}
          </tr>
        </tbody>
      </table>
      {/* {DaysOfTheWeek.map((day) => {
        return (
          <div className="column">
            <h1>{day}</h1>
            <h3>Workout</h3>
            {Meals.map((meal) => {
              return (
                <div className="table-meal">
                  <h3>{meal}</h3>
                  {needToEat &&
                    needToEat.map((food) => {
                      return (
                        food.meal_of_the_day === meal &&
                        food.day === day && (
                          <div key={food.id}>
                            <h4>
                              {food.name} ({food.weight * food.amount}g)
                            </h4>
                            <p>{food.calories * food.amount} calories</p>
                            <p>{food.protein * food.amount} protein</p>
                            <p>{food.carbs * food.amount} carbs</p>
                            <p>{food.fats * food.amount} fats</p>
                          </div>
                        )
                      );
                    })}
                </div>
              );
            })}
          </div>
        );
      })} */}
    </div>
  );
}
