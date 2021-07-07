import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SetErrorContext } from "../../App";
import WorkoutTimer from "./WorkoutTimer";

function LiveWorkout({ userDetails }) {
  const { workoutId } = useLocation();
  const setError = useContext(SetErrorContext);

  return (
    <div>
      <h1>LiveWorkout </h1>
      <WorkoutTimer />
    </div>
  );
}

export default LiveWorkout;
