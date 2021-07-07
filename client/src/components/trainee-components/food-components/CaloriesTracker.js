import React, { useState, useEffect, useRef, useContext } from "react";
import { SetErrorContext } from "../../../App";

import axios from "axios";
import { debounce } from "lodash";
import DaySelect from "./DaySelect";
import "../../../styles/CaloriesTracker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CaloriesTracker({ userDetails }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [usedCalories, setUsedCalories] = useState(0);
  const setError = useContext(SetErrorContext);

  const [selectedMeal, setSelectedMeal] = useState("");
  const [addFoodPressed, setAddFoodPressed] = useState(false);
  const [searchedFood, setSearchedFood] = useState([]);
  const foodSearchInput = useRef();
  const [popUpAddFood, setPopUpAddFood] = useState("");
  const [addFoodAmount, setAddFoodAmount] = useState(1);

  const [foodOfSelectedDate, setFoodOfSelectedDate] = useState("");

  useEffect(() => {
    if (foodOfSelectedDate.length > 0) {
    }
  }, [foodOfSelectedDate]);

  useEffect(() => {
    if (userDetails && foodOfSelectedDate) {
      setUsedCalories(0);
      setTotalCalories(userDetails.daily_calorie_goal);

      foodOfSelectedDate.map((food) => {
        setUsedCalories((prev) => prev + food.calories * food.amount);
      });
    }
  }, [foodOfSelectedDate]);

  const searchFood = debounce(() => {
    if (foodSearchInput.current.value) {
      axios
        .get(
          `http://localhost:3001/api/food/get-food?searchedFood=${foodSearchInput.current.value}`
        )
        .then(({ data }) => {
          setSearchedFood(data);
        })
        .catch((err) => setError(err.response.data));
    } else if (!foodSearchInput.current.value) {
      setSearchedFood([]);
    }
  }, 300);

  const addFoodOfSelectedDate = (food) => {
    axios
      .post("http://localhost:3001/api/food/eaten-food", {
        traineeId: userDetails.id,
        foodId: food.id,
        mealOfTheDay: selectedMeal,
        amount: addFoodAmount,
      })
      .then(({ data }) => {
        let temp = [...foodOfSelectedDate];
        temp.push(data);

        setFoodOfSelectedDate([...temp]);
        setAddFoodPressed(false);
        setSelectedMeal("");
      })
      .catch((err) => setError(err.response.data));
  };

  const deleteItemFromMeal = (id) => {
    axios
      .delete(
        `http://localhost:3001/api/food/eaten-food/${id}?traineeId=${userDetails.id}`
      )
      .then(({ data }) => {
        setFoodOfSelectedDate(data);
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <div className="calorie-tracker">
      <div className="meter-and-calendar">
        <div className="meter-and-title">
          <progress
            className="calorie-meter"
            min="0"
            value={usedCalories ? usedCalories : 0}
            max={
              totalCalories ? totalCalories : usedCalories ? usedCalories : 0
            }
          >
            {usedCalories}%
          </progress>
          <h3 className="meter-numbers">
            <span className={usedCalories > totalCalories ? "red" : "green"}>
              {Number(usedCalories)}
            </span>{" "}
            / {totalCalories} Calories Eaten
          </h3>
        </div>
        <DaySelect
          setFoodOfSelectedDate={setFoodOfSelectedDate}
          userDetails={userDetails}
        />
      </div>

      <div className="meals-container">
        <div className={selectedMeal === "Breakfast" ? "chosen-meal" : "meal"}>
          <div className="add-to-container">
            <h1>Breakfast</h1>
            <button
              onClick={() => {
                setSelectedMeal("Breakfast");
                setAddFoodPressed(true);
              }}
              className="add-food-button"
            >
              <FontAwesomeIcon icon={faPlus} color="black" className="fa-fa" />
            </button>
          </div>
          <div className="meal-container">
            {foodOfSelectedDate &&
              foodOfSelectedDate.map((food) => {
                return (
                  food.meal_of_the_day === "Breakfast" && (
                    <div className="eaten-food-container" key={food.id}>
                      <h4>
                        {food.name} ({food.weight * food.amount}g)
                      </h4>
                      <p>{food.calories * food.amount} calories</p>
                      <p>{food.protein * food.amount} protein</p>
                      <p>{food.carbs * food.amount} carbs</p>
                      <p>{food.fats * food.amount} fats</p>
                      <button
                        className="delete-eaten-food-button"
                        onClick={() => deleteItemFromMeal(food.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color="black"
                          className="fa-fa"
                        />
                      </button>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <div className={selectedMeal === "Lunch" ? "chosen-meal" : "meal"}>
          <div className="add-to-container">
            <h1>Lunch</h1>
            <button
              onClick={() => {
                setSelectedMeal("Lunch");
                setAddFoodPressed(true);
              }}
              className="add-food-button"
            >
              <FontAwesomeIcon icon={faPlus} color="black" className="fa-fa" />
            </button>
          </div>
          <div className="meal-container">
            {foodOfSelectedDate &&
              foodOfSelectedDate.map((food) => {
                return (
                  food.meal_of_the_day === "Lunch" && (
                    <div className="eaten-food-container" key={food.id}>
                      <h4>
                        {food.name} ({food.weight * food.amount}g)
                      </h4>
                      <p>{food.calories * food.amount} calories</p>
                      <p>{food.protein * food.amount} protein</p>
                      <p>{food.carbs * food.amount} carbs</p>
                      <p>{food.fats * food.amount} fats</p>
                      <button
                        className="delete-eaten-food-button"
                        onClick={() => deleteItemFromMeal(food.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color="black"
                          className="fa-fa"
                        />
                      </button>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <div className={selectedMeal === "Dinner" ? "chosen-meal" : "meal"}>
          <div className="add-to-container">
            <h1>Dinner</h1>
            <button
              onClick={() => {
                setSelectedMeal("Dinner");
                setAddFoodPressed(true);
              }}
              className="add-food-button"
            >
              <FontAwesomeIcon icon={faPlus} color="black" className="fa-fa" />
            </button>
          </div>
          <div className="meal-container">
            {foodOfSelectedDate &&
              foodOfSelectedDate.map((food) => {
                return (
                  food.meal_of_the_day === "Dinner" && (
                    <div className="eaten-food-container" key={food.id}>
                      <h4>
                        {food.name} ({food.weight * food.amount}g)
                      </h4>
                      <p>{food.calories * food.amount} calories</p>
                      <p>{food.protein * food.amount} protein</p>
                      <p>{food.carbs * food.amount} carbs</p>
                      <p>{food.fats * food.amount} fats</p>
                      <button
                        className="delete-eaten-food-button"
                        onClick={() => deleteItemFromMeal(food.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color="black"
                          className="fa-fa"
                        />
                      </button>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <div className={selectedMeal === "Snacks" ? "chosen-meal" : "meal"}>
          <div className="add-to-container">
            <h1>Snacks</h1>
            <button
              onClick={() => {
                setSelectedMeal("Snacks");
                setAddFoodPressed(true);
              }}
              className="add-food-button"
            >
              <FontAwesomeIcon icon={faPlus} color="black" className="fa-fa" />
            </button>
          </div>
          <div className="meal-container">
            {foodOfSelectedDate &&
              foodOfSelectedDate.map((food) => {
                return (
                  food.meal_of_the_day === "Snacks" && (
                    <div className="eaten-food-container" key={food.id}>
                      <h4>
                        {food.name} ({food.weight * food.amount}g)
                      </h4>
                      <p>{food.calories * food.amount} calories</p>
                      <p>{food.protein * food.amount} protein</p>
                      <p>{food.carbs * food.amount} carbs</p>
                      <p>{food.fats * food.amount} fats</p>
                      <button
                        className="delete-eaten-food-button"
                        onClick={() => deleteItemFromMeal(food.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color="black"
                          className="fa-fa"
                        />
                      </button>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
      {addFoodPressed && (
        <div className="popup-background">
          <div className="popup-add-food">
            <input
              className="search-food-input"
              ref={foodSearchInput}
              onChange={searchFood}
              placeholder="search food"
            ></input>
            <button
              className="popup-close-button"
              onClick={() => {
                setAddFoodPressed(false);
                setSelectedMeal("");
              }}
            >
              close
            </button>
            <div className="searched-food-list">
              {searchedFood.map((food, i) => {
                return (
                  <h4
                    className="searched-food-single"
                    key={food.id}
                    onClick={() => {
                      setAddFoodAmount(1);
                      setPopUpAddFood(food);
                    }}
                    key={food.id}
                  >
                    {food.name} ({food.weight}g)
                  </h4>
                );
              })}

              {popUpAddFood && (
                <div className="pop-up-selected-food">
                  <h3>
                    {popUpAddFood.name} ({popUpAddFood.weight * addFoodAmount}g)
                  </h3>
                  <p>Calories: {popUpAddFood.calories * addFoodAmount}</p>
                  <p>Protein: {popUpAddFood.protein * addFoodAmount}</p>
                  <p>Carbs: {popUpAddFood.carbs * addFoodAmount}</p>
                  <p>Fats: {popUpAddFood.fats * addFoodAmount}</p>
                  <label>Amount:</label>
                  <input
                    onChange={(e) => setAddFoodAmount(e.target.value)}
                    value={addFoodAmount}
                  ></input>
                  <button
                    className="add-food-button"
                    onClick={() => addFoodOfSelectedDate(popUpAddFood)}
                  >
                    ADD
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
