import axios from "axios";
import React, { useState, useEffect } from "react";

function WorkoutPopup({
  exercises,
  setExercises,
  trigger,
  setTrigger,
  userDetails,
}) {
  const [sets, setSets] = useState([]);
  const [draggedOver, setDraggedOver] = useState();
  const [draggedItem, setDraggedItem] = useState();
  const [tempNewOrder, setTempNewOrder] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutSets, setWorkoutSets] = useState();

  useEffect(() => {
    let temp = [...exercises].map((val) => {
      const set = sets.find((item) => item.name === val);
      let item = {
        name: val,
        min_reps: set ? set["min_reps"] : 1,
        max_reps: set ? set["max_reps"] : 1,
        sets: set ? set["sets"] : 1,
        rest: set ? set["rest"] : 0,
        added_weight: set ? set["added_weight"] : 0,
      };
      return item;
    });
    setSets(temp);
  }, [exercises]);

  function changeOrder(indexToEnter, indexLocation) {
    if (
      (!indexToEnter && indexToEnter !== 0) ||
      (!indexLocation && indexLocation !== 0) ||
      indexToEnter === indexLocation
    )
      return;
    let name = exercises[indexToEnter];
    let newExercises = [...exercises].filter(
      (item, index) => index !== indexToEnter
    );
    newExercises.splice(indexLocation, 0, name);
    setTempNewOrder(newExercises);
  }

  return trigger ? (
    <div className="pop-up">
      <div className="pop-up-inner">
        <button className="close-button" onClick={() => setTrigger(false)}>
          close
        </button>
        <input
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder={"Enter Your Workout Name"}
        />
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
            {exercises.map((value, index) => (
              <tr
                className="set-div"
                key={"set" + index}
                draggable
                onDragStart={() => {
                  setDraggedItem(index);
                }}
                onDragEnd={() => {
                  setDraggedItem(undefined);
                  setExercises(tempNewOrder);
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
                <td>{value}</td>
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
            <br />
            <strong>Sets: </strong>
            <input
              type="number"
              min={1}
              defaultValue={1}
              onChange={(e) => setWorkoutSets(e.target.value)}
            />
          </tbody>
        </table>
        <button
          onClick={() => {
            axios
              .post("/api/coach/workouts/new/" + userDetails.id, {
                name: workoutName,
                sets: setWorkoutSets,
                exercises: sets,
              })
              .then(() => {
                setExercises([]);
                setSets([]);
                setTrigger(false);
              })
              .catch((err) => console.log(err.response.data));
          }}
        >
          Create Workout
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default WorkoutPopup;
