import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/WeeklyCalendar.css";

export default function TraineesWeeklyCalendar({ chosenTrainee }) {
  const [needToEat, setNeedToEat] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [chosenMeal, setChosenMeal] = useState("");
  const [foodSearch, setFoodSearch] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (chosenTrainee) {
      axios
        .get(`http://localhost:3001/api/food/need-to-eat/${chosenTrainee.id}`)
        .then(({ data }) => {
          setNeedToEat(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [chosenTrainee]);

  const removeThisFood = (foodId) => {
    console.log(foodId);
    console.log(chosenTrainee.id);
    axios
      .delete(
        `http://localhost:3001/api/food/need-to-eat/${foodId}?traineeId=${chosenTrainee.id}`
      )
      .then(({ data }) => {
        setNeedToEat(data);
      })
      .catch((e) => console.log(e.response.data));
  };

  const openSearchFoodInput = () => {};

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
    <div>
      <button
        onClick={() => {
          editMode ? setEditMode(false) : setEditMode(true);
        }}
      >
        EDIT
      </button>

      <div className="table">
        {DaysOfTheWeek.map((day) => {
          return (
            <div className="column" key={day}>
              <h1>{day}</h1>
              <h3>Workout</h3>
              {Meals.map((meal) => {
                return (
                  <div
                    className={
                      chosenMeal.meal === meal && chosenMeal.day === day
                        ? "chosen-meal table-meal"
                        : "table-meal"
                    }
                    key={`${day} ${meal}`}
                  >
                    <h3>{meal}</h3>
                    {editMode && (
                      <button
                        onClick={() => {
                          openSearchFoodInput();
                          setChosenMeal({ day, meal });
                        }}
                      >
                        +
                      </button>
                    )}
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
                              {editMode && (
                                <button onClick={() => removeThisFood(food.id)}>
                                  remove
                                </button>
                              )}
                            </div>
                          )
                        );
                      })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* {chosenMeal && (
        <div className="pop-up-selected-food">
          <h3>
            {foodSearch.name} ({foodSearch.weight * addFoodAmount}g)
          </h3>
          <p>Calories: {foodSearch.calories * addFoodAmount}</p>
          <p>Protein: {foodSearch.protein * addFoodAmount}</p>
          <p>Carbs: {foodSearch.carbs * addFoodAmount}</p>
          <p>Fats: {foodSearch.fats * addFoodAmount}</p>
          <label>Amount:</label>
          <input
            onChange={(e) => setAddFoodAmount(e.target.value)}
            value={addFoodAmount}
          ></input>
          <button onClick={() => addEatenFood(foodSearch)}>ADD</button>
        </div>
      )} */}
    </div>
  );
}
