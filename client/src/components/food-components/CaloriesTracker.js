import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { debounce } from "lodash";
import "../../styles/CaloriesTracker.css";

export default function CaloriesTracker({ userDetails }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [usedCalories, setUsedCalories] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [eatenFood, setEatenFood] = useState([]);

  const [selectedMeal, setSelectedMeal] = useState("");
  const [addFoodPressed, setAddFoodPressed] = useState(false);
  const [searchedFood, setSearchedFood] = useState([]);
  const foodSearchInput = useRef();
  const [popUpAddFood, setPopUpAddFood] = useState("");
  const [addFoodAmount, setAddFoodAmount] = useState(1);

  useEffect(() => {
    if (userDetails) {
      axios
        .get(`http://localhost:3001/api/food/eaten-food/${userDetails.id}`)
        .then(({ data }) => {
          setEatenFood(data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && eatenFood) {
      setUsedCalories(0);
      setTotalCalories(userDetails.daily_calorie_goal);

      eatenFood.map((food) => {
        setUsedCalories((prev) => prev + food.food_calories);
      });
    }
  }, [userDetails, eatenFood]);

  const searchFood = debounce(() => {
    if (foodSearchInput.current.value) {
      axios
        .get(
          `http://localhost:3001/api/food/get-food/${foodSearchInput.current.value}`
        )
        .then(({ data }) => {
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
      .post("http://localhost:3001/api/food/eaten-food", {
        id: userDetails.id,
        food,
        mealOfTheDay: selectedMeal,
      })
      .then((res) => {
        setEatenFood(res.data);
        setAddFoodPressed(false);
        setSelectedMeal("");
      })
      .catch((err) => console.log(err.response.data));
  };

  const deleteItemFromMeal = (id) => {
    axios
      .delete(`http://localhost:3001/api/food/eaten-food/${id}`)
      .then(({ data }) => {
        setEatenFood(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <meter min="0" value={usedCalories} max={totalCalories}>
        {usedCalories}%
      </meter>
      <h3>
        {usedCalories} / {totalCalories} Calories Eaten
      </h3>

      <div className="meal-container">
        <div className={selectedMeal === "Breakfast" ? "chosen-meal" : "meal"}>
          <h1>Breakfast</h1>

          {eatenFood.map((food) => {
            return (
              food.meal_of_the_day === "Breakfast" && (
                <div>
                  <h4>{food.food_name}</h4>
                  <span>{food.food_calories} calories</span>
                  <button onClick={() => deleteItemFromMeal(food.id)}>X</button>
                </div>
              )
            );
          })}

          <button
            onClick={() => {
              setSelectedMeal("Breakfast");
              setAddFoodPressed(true);
            }}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
        <div className={selectedMeal === "Lunch" ? "chosen-meal" : "meal"}>
          <h1>Lunch</h1>
          {eatenFood.map((food) => {
            return (
              food.meal_of_the_day === "Lunch" && (
                <div>
                  <h4>{food.food_name}</h4>
                  <span>{food.food_calories} calories</span>
                  <button onClick={() => deleteItemFromMeal(food.id)}>X</button>
                </div>
              )
            );
          })}
          <button
            onClick={() => {
              setSelectedMeal("Lunch");
              setAddFoodPressed(true);
            }}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
        <div className={selectedMeal === "Dinner" ? "chosen-meal" : "meal"}>
          <h1>Dinner</h1>
          {eatenFood.map((food) => {
            return (
              food.meal_of_the_day === "Dinner" && (
                <div>
                  <h4>{food.food_name}</h4>
                  <span>{food.food_calories} calories</span>
                  <button onClick={() => deleteItemFromMeal(food.id)}>X</button>
                </div>
              )
            );
          })}
          <button
            onClick={() => {
              setSelectedMeal("Dinner");
              setAddFoodPressed(true);
            }}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
        <div className={selectedMeal === "Snacks" ? "chosen-meal" : "meal"}>
          <h1>Snacks</h1>
          {eatenFood.map((food) => {
            return (
              food.meal_of_the_day === "Snacks" && (
                <div>
                  <h4>{food.food_name}</h4>
                  <span>{food.food_calories} calories</span>
                  <button onClick={() => deleteItemFromMeal(food.id)}>X</button>
                </div>
              )
            );
          })}
          <button
            onClick={() => {
              setSelectedMeal("Snacks");
              setAddFoodPressed(true);
            }}
            className="add-food-button"
          >
            Add Food
          </button>
        </div>
      </div>
      {addFoodPressed && (
        <>
          <input
            ref={foodSearchInput}
            onChange={searchFood}
            placeholder="search food"
          ></input>
          <button
            onClick={() => {
              setAddFoodPressed(false);
              setSelectedMeal("");
            }}
          >
            close
          </button>
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
        </>
      )}
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
}