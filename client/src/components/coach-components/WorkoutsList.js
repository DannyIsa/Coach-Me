import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditWorkoutPopup from "./EditWorkoutPopup";
import { SetErrorContext } from "../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function WorkoutsList({ userDetails }) {
  const [workouts, setWorkouts] = useState([]);
  const [shownWorkout, setShownWorkout] = useState();
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [render, setRender] = useState(false);
  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (!userDetails) return;
    axios
      .get("/api/coach/workouts/show/" + userDetails.id)
      .then(({ data }) => setWorkouts(data))
      .catch((err) => setError(err.response.data));
  }, [userDetails, render]);

  const handleRemove = (itemId) => {
    axios
      .delete(
        `/api/coach/workouts/delete/${userDetails.id}?workoutId=${itemId}`
      )
      .then(() => {
        setShownWorkout();
        setWorkouts([...workouts].filter((workout) => workout.id !== itemId));
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="workout-list-start">
      <Link to="/coach/workouts/create">Create workout</Link>
      {userDetails && shownWorkout && (
        <EditWorkoutPopup
          userDetails={userDetails}
          trigger={popupTrigger}
          setTrigger={setPopupTrigger}
          workout={shownWorkout}
          setWorkout={setShownWorkout}
          render={() => setRender(!render)}
        />
      )}
      <h1>Your Workouts:</h1>
      <div className="ticket-list">
        {workouts.map((item, index) => (
          <div className="workout-ticket">
            <div className="ticket-header">
              <button
                onClick={() => handleRemove(item.id)}
                className="remove-workout"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="white"
                  className="fas-fas"
                />
              </button>
              <button
                className="editable-btn"
                onClick={() => {
                  setShownWorkout(item);
                  setPopupTrigger(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faPen}
                  color="white"
                  className="fas-fas"
                />
              </button>

              <span>{"X" + item.sets}</span>
              <h3 className="ticket-title">{item.name}</h3>
            </div>
            <div className="ticket-content">
              <span className="first">
                <ol>
                  {item.exercises.map((item) => (
                    <li className="exercise-block">
                      <h2 className="exercise-name">{item.name}</h2>
                      <h3 className="exercise-details">{`${item.min_reps} ${
                        item.min_reps !== item.max_reps
                          ? "-" + item.max_reps
                          : ""
                      } reps, rest for ${item.rest}s ${
                        item.added_weight > 0
                          ? "+" + item.added_weight + "kg "
                          : ""
                      }X${item.sets}`}</h3>
                    </li>
                  ))}
                </ol>
              </span>
            </div>
          </div>

          //  {/* <div className="ticket"> */}
          //  {/* <div className="ticket-header"> */}
          // {/* <h1 className="workout-name">{item.name}</h1> */}
          // {/* <ol>
          //   {item.exercises.map((item) => (
          //     <li className="exercise-block">
          //       <h2 className="exercise-name">{item.name}</h2>
          //       <h3 className="exercise-details">{`${item.min_reps} ${
          //         item.min_reps !== item.max_reps ? "-" + item.max_reps : ""
          //       } reps, rest for ${item.rest}s ${
          //         item.added_weight > 0
          //           ? "+" + item.added_weight + "kg "
          //           : ""
          //       }X${item.sets}`}</h3>
          //     </li>
          //   ))}
          // </ol> */}
          // {/* <h1>{"X" + item.sets}</h1> */}
          // {/* // <button onClick={() => handleRemove(item.id)}>Remove</button> */}
          // {/* <button
          //   onClick={() => {
          //     setShownWorkout(item);
          //     setPopupTrigger(true);
          //   }}
          // >
          //   edit
          // </button> */}
          //  <br />
          //   </div>
          // </div>
        ))}
        <br />
      </div>
    </div>
  );
}

export default WorkoutsList;
