import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pdf from "../../documents/health_declaration.pdf";
import EditableInput from "./EditableInput";
function TraineeDashboard({ userDetails }) {
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [measureLogs, setMeasureLogs] = useState([]);
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
        if (data) {
          setMeasureLogs(data[data.length - 1]);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });

  const updateMeasurements = () =>
    axios
      .post("http://localhost:3001/api/logs/measure/add", {
        id: userDetails.id,
        weight: userDetails.weight,
        chestPerimeter: measureLogs.chest_perimeter,
        hipPerimeter: measureLogs.hip_perimeter,
        bicepPerimeter: measureLogs.bicep_perimeter,
        thighPerimeter: measureLogs.thigh_perimeter,
        waistPerimeter: measureLogs.waist_perimeter,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));

  useEffect(() => {
    if (!userDetails) return;
    getWorkoutsLog();
    getMeasurements();
  }, [userDetails]);

  // useEffect(() => {
  //   updateMeasurements();
  // }, [measureLogs]);

  return (
    <div className="trainee-dashboard">
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Workout</td>
            <td>Workout</td>
            <td>Workout</td>
            <td>Workout</td>
            <td>Workout</td>
            <td>Workout</td>
            <td>Workout</td>
          </tr>
          <tr>
            <td>Breakfast</td>
            <td>Breakfast</td>
            <td>Breakfast</td>
            <td>Breakfast</td>
            <td>Breakfast</td>
            <td>Breakfast</td>
            <td>Breakfast</td>
          </tr>
          <tr>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
            <td>Lunch</td>
          </tr>
          <tr>
            <td>Dinner</td>
            <td>Dinner</td>
            <td>Dinner</td>
            <td>Dinner</td>
            <td>Dinner</td>
            <td>Dinner</td>
            <td>Dinner</td>
          </tr>
          <tr>
            <td>Snacks</td>
            <td>Snacks</td>
            <td>Snacks</td>
            <td>Snacks</td>
            <td>Snacks</td>
            <td>Snacks</td>
            <td>Snacks</td>
          </tr>
        </tbody>
      </table>
      {userDetails ? (
        <>
          <h1>{userDetails.name}</h1>
          <h1>{userDetails.email}</h1>
          <br />
          <h2>Personal info:</h2>
          <div>Email: {userDetails.email}</div>
          <div>birthdate: {userDetails.birthdate}</div>
          <div>Goal: {}</div>
          <div>Activity Level: {}</div>
          <div>Workouts Per Week: {}</div>
          <br />
          <button
            className="edit-button"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Save" : "Edit"}
          </button>
          {/* <button onClick={updateMeasurements}>click to update</button> */}
          <h2>Body Measurments:</h2>
          <EditableInput
            value={userDetails.height + " cm"}
            attribute={"Height"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.weight + " kg"}
            attribute={"Weight"}
            editing={editMode}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.chest_perimeter !== null
                ? measureLogs.chest_perimeter + " cm"
                : "no value"
            }
            attribute={"Chest"}
            editing={editMode}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.hip_perimeter !== null
                ? measureLogs.hip_perimeter + " cm"
                : "no value"
            }
            attribute={"Hip"}
            editing={editMode}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.bicep_perimeter !== null
                ? measureLogs.bicep_perimeter + " cm"
                : "no value"
            }
            attribute={"Bicep"}
            editing={editMode}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.waist_perimeter !== null
                ? measureLogs.waist_perimeter + " cm"
                : "no value"
            }
            attribute={"Waist"}
            editing={editMode}
          />
          <EditableInput
            value={
              measureLogs && measureLogs.thigh_perimeter !== null
                ? measureLogs.thigh_perimeter + " cm"
                : "no value"
            }
            attribute={"thigh"}
            editing={editMode}
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
