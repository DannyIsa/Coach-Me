import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/WeeklyCalendar.css";

export default function WeeklyCalendar({ userDetails }) {
  const [needToEat, setNeedToEat] = useState([]);

  useEffect(() => {
    if (userDetails) {
      axios
        .get(`http://localhost:3001/api/food/need-to-eat/${userDetails.id}`)
        .then(({ data }) => {
          setNeedToEat(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userDetails]);

  const MEALS = ["Breakfast", "Lunch", "Dinner"];
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
    <div className="table">
      {DaysOfTheWeek.map((day) => {
        return (
          <div className="column">
            <h1>{day}</h1>
            <h3>Workout</h3>
            {MEALS.map((meal) => {
              return (
                <>
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
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
