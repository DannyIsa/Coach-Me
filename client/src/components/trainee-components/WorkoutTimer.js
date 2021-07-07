import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SetErrorContext } from "../../App";

function WorkoutTimer({ userDetails }) {
  const { workoutId } = useLocation();
  const setError = useContext(SetErrorContext);

  return (
    <div>
      <h1>WorkoutTimer</h1>
      <h3>{workoutId}</h3>
    </div>
  );
}

export default WorkoutTimer;
