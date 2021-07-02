import axios from "axios";
import React, { useEffect, useState } from "react";
import pdf from "../../documents/health_declaration.pdf";
import EditableInput from "../EditableInput";
import { Link } from "react-router-dom";

function TraineeDashboard({ userDetails }) {
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [measureLogs, setMeasureLogs] = useState({});
  const [editMode, setEditMode] = useState(false);

  const getWorkoutsLog = () =>
    axios
      .get("http://localhost:3001/api/logs/workout/show/" + userDetails.id)
      .then(({ data }) => {
        if (data) {
          const workouts = data.map((workout, i) => {
            const workoutName = workout.name;
            setPreviousWorkouts((previousWorkouts) => [
              ...previousWorkouts,
              workoutName,
            ]);
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });

  const getMeasurements = () =>
    axios
      .get("http://localhost:3001/api/logs/measure/show/" + userDetails.id)
      .then(({ data }) => {
        if (data.length === 0) {
          setMeasureLogs({});
        } else {
          setMeasureLogs(data[data.length - 1]);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });

  const updateMeasurements = () => {
    if (!editMode) {
      setEditMode(!editMode);
      return;
    } else {
      axios
        .post("http://localhost:3001/api/logs/measure/add", {
          id: userDetails.id,
          height: measureLogs.height,
          weight: measureLogs.weight,
          chestPerimeter: measureLogs.chest_perimeter,
          hipPerimeter: measureLogs.hip_perimeter,
          bicepPerimeter: measureLogs.bicep_perimeter,
          thighPerimeter: measureLogs.thigh_perimeter,
          waistPerimeter: measureLogs.waist_perimeter,
        })
        .then((res) => {
          setMeasureLogs(res.data);
          setEditMode(!editMode);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    if (!userDetails) return;
    getWorkoutsLog();
    getMeasurements();
  }, [userDetails]);

  return (
    <div className="trainee-dashboard">
      <Link to="/trainee/calendar">Weekly Calendar</Link>
      {userDetails ? (
        <>
          <h1>{userDetails.name}</h1>
          <h1>{userDetails.email}</h1>
          <br />
          <h2>Personal info:</h2>
          <div>Email: {userDetails.email}</div>
          <div>birthdate: {userDetails.birthdate}</div>
          <div>Goal: {}</div>
          <div>Activity Level: {userDetails.activity_level}</div>
          <div>Workouts Per Week: {}</div>
          <br />
          <button className="edit-button" onClick={updateMeasurements}>
            {editMode ? "Save" : "Edit"}
          </button>
          <h2>Body Measurments:</h2>
          <EditableInput
            value={
              measureLogs && measureLogs.height
                ? measureLogs.height
                : userDetails.height
            }
            attribute={"height"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.weight
                ? measureLogs.weight
                : userDetails.weight
            }
            attribute={"weight"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.chest_perimeter
                ? measureLogs.chest_perimeter
                : "no value"
            }
            attribute={"chest_perimeter"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.hip_perimeter
                ? measureLogs.hip_perimeter
                : "no value"
            }
            attribute={"hip_perimeter"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.bicep_perimeter
                ? measureLogs.bicep_perimeter
                : "no value"
            }
            attribute={"bicep_perimeter"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.waist_perimeter
                ? measureLogs.waist_perimeter
                : "no value"
            }
            attribute={"waist_perimeter"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.thigh_perimeter
                ? measureLogs.thigh_perimeter
                : "no value"
            }
            attribute={"thigh_perimeter"}
            editing={editMode}
            state={measureLogs}
            setState={setMeasureLogs}
          />
          <br />
          <h2>Forms To Fill Out:</h2>
          <div>daily general update</div>
          <div>
            health declaration
            <a href={pdf} target="_blank">
              download pdf
            </a>
          </div>

          <br />
          <h2>
            My Next Workout:
            {previousWorkouts}
          </h2>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default TraineeDashboard;
