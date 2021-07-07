import React from "react";
import { useLocation } from "react-router-dom";
import { useTimer } from "react-timer-hook";

function WorkoutTimer({ userDetails }) {
  const { seconds, minutes, hours, isRunning, start, pause, reset } = useTimer({
    autoStart: false,
  });

  return (
    <div className="timerContainer" style={{ textAlign: "center" }}>
      <div className="timer" style={{ fontSize: "70px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default WorkoutTimer;
