import React, { useState } from "react";

export default function CalorieBar({ totalCalories, usedCalories }) {
  return (
    <div>
      <progress id="file" value={usedCalories} max={totalCalories}>
        {" "}
        {counter}%{" "}
      </progress>
      <div>
        {totalCalories} - {usedCalories} = {totalCalories - usedCalories}
      </div>
    </div>
  );
}
