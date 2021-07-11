import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SetErrorContext } from "../App";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

function TraineeLogs({ userDetails, type }) {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [measureLogs, setMeasureLogs] = useState([]);
  const [dietLogs, setDietLogs] = useState([]);
  const [wod, setWod] = useState({ done: false, workout: undefined });
  const setError = useContext(SetErrorContext);

  useEffect(async () => {
    if (!userDetails) return;
    try {
      const mLogs = await axios.get("/api/logs/measure/show/" + userDetails.id);
      const dLogs = await axios.get(
        "/api/logs/diet/show/all/" + userDetails.id
      );
      const wLogs = await axios.get("/api/logs/workout/show/" + userDetails.id);
      const todayWorkout = await axios.get(
        "/api/logs/workout/check/" + userDetails.id
      );
      setWod(todayWorkout.data);
      setWorkoutLogs(wLogs.data);
      setDietLogs(dLogs.data);
      setMeasureLogs(mLogs.data);
    } catch (err) {
      setError(err.response.data);
    }
  }, [userDetails]);
  return (
    <div className="trainee-logs">
      {userDetails ? (
        <>
          {type === "Trainee" && (
            <>
              <h1>{`Welcome Back, ${userDetails.name} !`}</h1>
              <Link to="/trainee/calendar" className="trainee-calendar">
                Weekly Calendar
              </Link>
            </>
          )}
          <div className="charts">
            <div className="chart">
              <h2>Diet Logs</h2>
              <LineChart
                width={450}
                height={500}
                data={dietLogs}
                className="line-chart"
              >
                {console.log(dietLogs)}
                <Legend verticalAlign="top" height={36} />
                <Line
                  name="Calories(cal)"
                  type="monotone"
                  dataKey="total_calories"
                  stroke="black"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  name="Protein(g)"
                  dataKey="total_protein"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  name="Fats(g)"
                  dataKey="total_fats"
                  stroke="blue"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  name="Carbs(g)"
                  dataKey="total_carbs"
                  stroke="green"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  name="Calorie Goal(cal)"
                  dataKey="calorie_goal"
                  stroke="red"
                  strokeWidth={3}
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
            <div className="chart">
              <h2>Measure Logs</h2>
              <LineChart
                width={500}
                height={500}
                data={measureLogs}
                className="line-chart"
              >
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  name="Weight(kg)"
                  stroke="black"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="chest_perimeter"
                  name="Chest Perimeter(cm)"
                  stroke="red"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="thigh_perimeter"
                  name="Thigh Perimeter(cm)"
                  stroke="blue"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="bicep_perimeter"
                  name="Bicep Perimeter(cm)"
                  stroke="green"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  name="Hip Perimeter(cm)"
                  dataKey="hip_perimeter"
                  strokeWidth={3}
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
            <div>
              <h2>Previous Workouts:</h2>
              {workoutLogs.length > 0 ? (
                workoutLogs.map((item, index) => (
                  <h3 key={index}>{`[ ${new Date(
                    item.date
                  ).toLocaleDateString()} ${new Date(
                    item.date
                  ).toLocaleTimeString("IT-it")} ]:  ${item.name}`}</h3>
                ))
              ) : (
                <h3>No Previous Workouts</h3>
              )}
            </div>
            {type === "Trainee" && (
              <div>
                <h2>Today's Workout: </h2>
                {wod.workout ? (
                  wod.done ? (
                    <h3>No Workouts Remaining For Today!</h3>
                  ) : (
                    <Link to={`/trainee/workout/${wod.workout.id}`}>
                      {wod.workout.name}
                    </Link>
                  )
                ) : (
                  <h3>No Workouts Remaining For Today!</h3>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeLogs;
