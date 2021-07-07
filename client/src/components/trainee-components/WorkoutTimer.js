import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

function WorkoutTimer({ rest, raiseIndex, index }) {
  const [started, setStarted] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + rest);
  const { seconds, minutes, hours, isRunning, start, resume, pause, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp: time,
      onExpire: () => {
        raiseIndex();
        setStarted(false);
      },
    });
  useEffect(() => {
    restart(time, false);
  }, [index]);
  return (
    <div className="timerContainer" style={{ textAlign: "center" }}>
      <div className="timer" style={{ fontSize: "70px" }}>
        <h3>{isRunning ? "Resting" : "Rest"}</h3>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <button
        onClick={(e) => {
          if (started) {
            resume(e);
          } else {
            setStarted(true);
            start(e);
          }
        }}
      >
        {started ? "Resume" : "Start"}
      </button>
      <button onClick={pause}>Pause</button>
      <button
        onClick={() => {
          if (!started) return;
          setStarted(false);
          console.log(rest);
          restart(time, false);
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default WorkoutTimer;
