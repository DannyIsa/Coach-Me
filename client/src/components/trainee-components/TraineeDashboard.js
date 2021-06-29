import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if (!userDetails) return;
    getWorkoutsLog();
    getMeasurements();
  }, [userDetails]);

  return (
    <div className="trainee-dashboard">
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
          <h2>Body Measurments:</h2>
          <EditableInput
            value={userDetails.height}
            attribute={"Height"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.weight}
            attribute={"Weight"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.chest_perimeter}
            attribute={"Chest"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.hip_perimeter}
            attribute={"Hip"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.bicep_perimeter}
            attribute={"Bicep"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.waist_perimeter}
            attribute={"Waist"}
            editing={editMode}
          />
          <EditableInput
            value={userDetails.thigh_perimeter}
            attribute={"thigh"}
            editing={editMode}
          />
          <br />
          <h2>Forms To Fill Out:</h2>
          <div>daily general update</div>
          <div>health declaration</div>
          <br />
          <h2>
            My Next Workout:
            {previousWorkouts}
          </h2>
          {/* <Link to="/trainee/coaches">Coaches List</Link> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default TraineeDashboard;

{
  /* <Link to="/trainee/coaches">Coaches</Link> */
}
