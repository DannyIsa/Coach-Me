import React, { useState, useEffect } from "react";
import { getCurrentDate } from "../utils";
import axios from "axios";

export default function CaloriesTracker({ userDetails }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [usedCalories, setUsedCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [usedProtein, setUsedProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [usedCarbs, setUsedCarbs] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [usedFats, setUsedFats] = useState(0);

  useEffect(() => {
    if (userDetails) {
      const traineesDailyCalorieGoal = userDetails.daily_calorie_goal;
      setTotalCalories(traineesDailyCalorieGoal);
      axios
        .get(`http://localhost:3001/api/logs/diet/show/${userDetails.id}`)
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
          setTotalProtein(total_protein);
          setUsedProtein(used_protein);
          setTotalCarbs(total_carbs);
          setUsedCarbs(used_carbs);
          setTotalFats(total_fat);
          setUsedFats(used_fat);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userDetails]);

  return (
    <div>
      <div>Todays date is: {getCurrentDate()}</div>
      <meter min="0" value={usedCalories} max={totalCalories}>
        {usedCalories}%
      </meter>
      <h3>
        {usedCalories} / {totalCalories}
      </h3>

      <table>
        <tr>
          <th></th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Carbs</th>
          <th>Fats</th>
        </tr>
        <tr>
          <td>Breakfast</td>
          <td>{usedCalories}</td>
          <td>{usedProtein}</td>
          <td>{usedCarbs}</td>
          <td>{usedFats}</td>
          <button>Add Food</button>
        </tr>
        <tr>
          <td>Launch</td>
          <td>{usedCalories}</td>
          <td>{usedProtein}</td>
          <td>{usedCarbs}</td>
          <td>{usedFats}</td>
          <button>Add Food</button>
        </tr>
        <tr>
          <td>Dinner</td>
          <td>{usedCalories}</td>
          <td>{usedProtein}</td>
          <td>{usedCarbs}</td>
          <td>{usedFats}</td>
          <button>Add Food</button>
        </tr>
        <tr>
          <td>Snacks</td>
          <td>{usedCalories}</td>
          <td>{usedProtein}</td>
          <td>{usedCarbs}</td>
          <td>{usedFats}</td>
          <button>Add Food</button>
        </tr>
        <tr>
          <td>Goal</td>
          <td>{totalCalories}</td>
          <td>{totalProtein}</td>
          <td>{totalCarbs}</td>
          <td>{totalFats}</td>
        </tr>
      </table>
    </div>
  );
}
