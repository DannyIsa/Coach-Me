import React, { useState, useEffect, useRef } from "react";
import { getCurrentDate } from "../utils";
import axios from "axios";
import { debounce } from "lodash";
import "../styles/CaloriesTracker.css";

export default function CaloriesTracker({ userDetails }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [usedCalories, setUsedCalories] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedMeal, setSelectedMeal] = useState("");
  const [searchedFood, setSearchedFood] = useState([]);
  const foodSearchInput = useRef();
  const [popUpAddFood, setPopUpAddFood] = useState("");
  const [addFoodAmount, setAddFoodAmount] = useState(1);

  const searchFood = debounce(() => {
    if (foodSearchInput.current.value) {
      axios
        .get(`http://localhost:3001/api/food/${foodSearchInput.current.value}`)
        .then(({ data }) => {
          console.log(data);
          setSearchedFood(data);
        });
    } else if (!foodSearchInput.current.value) {
      setSearchedFood([]);
    }
  }, 300);

  const addEatenFood = (food) => {
    food.calories = food.calories * addFoodAmount;
    food.protein = food.protein * addFoodAmount;
    food.carbs = food.carbs * addFoodAmount;
    food.fats = food.fats * addFoodAmount;
    axios
      .post("http://localhost:3001/api/food/add", {
        id: userDetails.id,
        food,
        mealOfTheDay: selectedMeal,
      })
      .then((res) => setErrorMessage(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div>Todays date is: {getCurrentDate()}</div>
      <meter min="0" value={usedCalories} max={totalCalories}>
        {usedCalories}%
      </meter>
      <h3>
        {usedCalories} / {totalCalories}
      </h3>

      <div className="meal-container">
        <div className={selectedMeal === "Breakfast" ? "chosen-meal" : "meal"}>
          <h1>Breakfast</h1>
          <button
            onClick={() => setSelectedMeal("Breakfast")}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
        <div className={selectedMeal === "Lunch" ? "chosen-meal" : "meal"}>
          <h1>Lunch</h1>
          <button
            onClick={() => setSelectedMeal("Lunch")}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
        <div className={selectedMeal === "Dinner" ? "chosen-meal" : "meal"}>
          <h1>Dinner</h1>
          <button
            onClick={() => setSelectedMeal("Dinner")}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
        <div className={selectedMeal === "Snacks" ? "chosen-meal" : "meal"}>
          <h1>Snacks</h1>
          <button
            onClick={() => setSelectedMeal("Snacks")}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
      </div>

      <input
        ref={foodSearchInput}
        onChange={searchFood}
        placeholder="search food"
      ></input>
      <div>
        {searchedFood.map((food, i) => {
          return (
            <h4
              onClick={() => {
                setAddFoodAmount(1);
                setPopUpAddFood(food);
              }}
              // onMouseLeave={setPopUpAddFood("")}
              key={food.id}
            >
              {food.name}
            </h4>
          );
        })}

        {popUpAddFood && (
          <div className="pop-up-selected-food">
            <h3>{popUpAddFood.name}</h3>
            <p>Calories: {popUpAddFood.calories * addFoodAmount}</p>
            <p>Protein: {popUpAddFood.protein * addFoodAmount}</p>
            <p>Carbs: {popUpAddFood.carbs * addFoodAmount}</p>
            <p>Fats: {popUpAddFood.fats * addFoodAmount}</p>
            <label>Amount:</label>
            <input
              onChange={(e) => setAddFoodAmount(e.target.value)}
              value={addFoodAmount}
            ></input>
            <button onClick={() => addEatenFood(popUpAddFood)}>ADD</button>
          </div>
        )}
      </div>
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
}
