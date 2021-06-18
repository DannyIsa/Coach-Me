import React, { useState } from "react";
import { getCurrentDate } from "../utils";

export default function CaloriesTracker() {
  const [totalCalories, setTotalCalories] = useState(0);
  const dailyCalorieGoal = 2000;

  let breakfastItems = ['apples'];
  let lunchItems = [];
  let dinnerItems = [];
  let snacksItems = [];

  return (
    <div>
      {console.log(getCurrentDate())}
      <div>Todays date is: {getCurrentDate()}</div>
      <meter min="0" value={totalCalories} max={dailyCalorieGoal}></meter>
      <button>Add Food</button>
      <div className="diary">
          <li>breakfast</li>
          {breakfastItems}
          <li>lunch</li>
          {lunchItems}
          <li>dinner</li>
          {dinnerItems}
          <li>snacks</li>
          {snacksItems}
      </div>
    </div>
  );
}
