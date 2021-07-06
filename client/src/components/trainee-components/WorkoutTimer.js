import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function WorkoutTimer({ userDetails }) {
  const { workoutId } = useLocation();
  return (
    <div>
      <h1>WorkoutTimer</h1>
      <h3>{workoutId}</h3>
    </div>
  );
}

export default WorkoutTimer;
