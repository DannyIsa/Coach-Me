import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SetErrorContext } from "../../App";

export default function NeedToEat({ userDetails }) {
  const [needToEatFoodList, setNeedToEatFoodList] = useState([]);
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (userDetails) {
      axios
        .get(`http://localhost:3001/api/food/need-to-eat/${userDetails.id}`)
        .then(({ data }) => {
          setNeedToEatFoodList(data);
        })
        .catch((e) => console.log(e));
    }
  }, [userDetails]);

  return (
    <div className="meal-container">
      {/*style in CaloriesTracker.css */}
      <div className="meal">
        <h1>Breakfast</h1>
        {needToEatFoodList.map((food) => {
          return (
            food.meal_of_the_day === "Breakfast" && (
              <div key={food.id}>
                <h4>{food.food_name}</h4>
                <span>{food.food_calories} calories</span>
                <hr />
              </div>
            )
          );
        })}
      </div>
      <div className="meal">
        <h1>Lunch</h1>
        {needToEatFoodList.map((food) => {
          return (
            food.meal_of_the_day === "Lunch" && (
              <div key={food.id}>
                <h4>{food.food_name}</h4>
                <span>{food.food_calories} calories</span> <hr />
              </div>
            )
          );
        })}
      </div>{" "}
      <div className="meal">
        <h1>Dinner</h1>
        {needToEatFoodList.map((food) => {
          return (
            food.meal_of_the_day === "Dinner" && (
              <div key={food.id}>
                <h4>{food.food_name}</h4>
                <span>{food.food_calories} calories</span> <hr />
              </div>
            )
          );
        })}
      </div>{" "}
      <div className="meal">
        <h1>Snacks</h1>
        {needToEatFoodList.map((food) => {
          return (
            food.meal_of_the_day === "Snacks" && (
              <div key={food.id}>
                <h4>{food.food_name}</h4>
                <span>{food.food_calories} calories</span> <hr />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
