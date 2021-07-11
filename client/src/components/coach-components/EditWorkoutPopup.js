import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

function EditWorkoutPopup({
  workout,
  setWorkout,
  trigger,
  setTrigger,
  userDetails,
  render,
}) {
  const [sets, setSets] = useState([]);
  const [draggedOver, setDraggedOver] = useState();
  const [draggedItem, setDraggedItem] = useState();
  const [tempNewOrder, setTempNewOrder] = useState([]);
  const [workoutSets, setWorkoutSets] = useState(1);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (!workout) return;
    let temp = [...workout.exercises];
    setSets(temp);
  }, [workout]);

  function changeOrder(indexToEnter, indexLocation) {
    if (
      (!indexToEnter && indexToEnter !== 0) ||
      (!indexLocation && indexLocation !== 0) ||
      indexToEnter === indexLocation
    )
      return;
    let name = workout.exercises[indexToEnter];
    let newExercises = [...workout.exercises].filter(
      (item, index) => index !== indexToEnter
    );
    newExercises.splice(indexLocation, 0, name);
    setTempNewOrder(newExercises);
  }

  return trigger ? (
    <div className="pop-up">
      <div className="pop-up-inner">
        <button
          className="close-button"
          onClick={() => {
            setTrigger(false);
            setErrorMessage("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} color="#acacac" className="fa-fa" />
        </button>
        <h2>{workout.name}</h2>
        {sets.length > 0 && (
          <table>
            <thead>
              <tr>
                <td>Order</td>
                <td>Exercise</td>
                <td>Min-Reps</td>
                <td>Max-Reps</td>
                <td>Rest</td>
                <td>Sets</td>
                <td>Added Weight</td>
              </tr>
            </thead>
            <tbody>
              {workout &&
                workout.exercises.map((value, index) => (
                  <tr
                    className="set-div"
                    key={"set" + index}
                    draggable
                    onDragStart={() => {
                      setDraggedItem(index);
                    }}
                    onDragEnd={() => {
                      setDraggedItem(undefined);
                      setWorkout({ ...workout, exercises: tempNewOrder });
                    }}
                    onDragEnter={() => {
                      setDraggedOver(index);
                    }}
                    onDragLeave={() => {
                      changeOrder(draggedItem, draggedOver);
                      setDraggedOver(undefined);
                    }}
                  >
                    <td className="order">{index + 1}</td>
                    <td>{value.name}</td>
                    <td>
                      <input
                        type="number"
                        name="min_reps"
                        value={sets[index]["min_reps"]}
                        onChange={(e) => {
                          let temp = [...sets];
                          temp[index][e.target.name] = Number(e.target.value);
                          setSets(temp);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="max_reps"
                        value={sets[index]["max_reps"]}
                        onChange={(e) => {
                          let temp = [...sets];
                          temp[index][e.target.name] = Number(e.target.value);
                          setSets(temp);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="rest"
                        value={sets[index]["rest"]}
                        onChange={(e) => {
                          let temp = [...sets];
                          temp[index][e.target.name] = Number(e.target.value);
                          setSets(temp);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="sets"
                        value={sets[index]["sets"]}
                        onChange={(e) => {
                          let temp = [...sets];
                          temp[index][e.target.name] = Number(e.target.value);
                          setSets(temp);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="added_weight"
                        value={sets[index]["added_weight"]}
                        onChange={(e) => {
                          let temp = [...sets];
                          temp[index][e.target.name] = Number(e.target.value);
                          setSets(temp);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <br />
        <strong>Sets: </strong>
        <input
          type="number"
          min={1}
          defaultValue={workout.sets}
          onChange={(e) => setWorkoutSets(e.target.value)}
        />
        <br />
        <button
          className="save-change-btn"
          onClick={() => {
            axios
              .patch("/api/coach/workouts/update/" + userDetails.id, {
                workoutId: workout.id,
                sets: workoutSets,
                exercises: sets,
              })
              .then(() => {
                setErrorMessage("");
                setTrigger(false);
                render();
              })
              .catch((err) => setErrorMessage(err.response.data));
          }}
        >
          Save <FontAwesomeIcon icon={faSave} />
        </button>
        <h3 className="error-message">{errorMessage}</h3>
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditWorkoutPopup;
