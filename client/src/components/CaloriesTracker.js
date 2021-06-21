import React, { useState, useEffect } from "react";
import CalorieBar from "./CalorieBar";
import { getCurrentDate } from "../utils";
import axios from "axios";

export default function CaloriesTracker({ user }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [usedCalories, setUsedCalories] = useState(0);
  // const dailyCalorieGoal = 2000;

  useEffect(() => {
    const traineesDailyCalorieGoal = user.dailyCalorieGoal;
    setTotalCalories(traineesDailyCalorieGoal);
    axios
      .get(`/api/logs/diet/show/${user.id}`)
      .then((res) => {
        const {
          total_calories,
          used_calories,
          total_protein,
          used_protein,
          total_carbs,
          used_carbs,
          total_fat,
          used_fat,
        } = res.data;
        setUsedCalories(used_calories);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <div>
      {console.log(getCurrentDate())}
      <div>Todays date is: {getCurrentDate()}</div>
      {/* <meter min="0" value={totalCalories} max={dailyCalorieGoal}></meter> */}
      <button>Add Food</button>
      {/* <div className="diary">
        <li>breakfast</li>
        {breakfastItems}
        <li>lunch</li>
        {lunchItems}
        <li>dinner</li>
        {dinnerItems}
        <li>snacks</li>
        {snacksItems}
      </div> */}
    </div>
  );
}
