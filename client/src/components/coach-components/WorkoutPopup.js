import axios from "axios";
import React, { useState, useEffect } from "react";

function WorkoutPopup({ exercises, trigger, setTrigger }) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    let temp = [...exercises].map((val) => {
      let item = {
        name: val,
        min_reps: 0,
        max_reps: 0,
        sets: 0,
        rest: 0,
        added_weight: 0,
      };
      return item;
    });
    setSets(temp);
  }, [exercises]);

  function validate(val) {
    if (Number(val)) if (Number(val) >= 0) return true;
    return false;
  }

  return trigger ? (
    <div className="pop-up">
      <div className="pop-up-inner">
        <button className="close-button" onClick={() => setTrigger(false)}>
          close
        </button>
        <h1>Your sets</h1>
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
              <tr className="set-div" key={"set" + index}>
                <td className="order">{index + 1}</td>
                <td>{value}</td>
                <td>
                  <input
                    type="number"
                    name="min_reps"
                    defaultValue={1}
                    min={1}
                    max={sets[index]["max_reps"]}
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
                    defaultValue={1}
                    min={sets[index]["min_reps"]}
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
                    defaultValue={1}
                    min={1}
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
                    defaultValue={0}
                    min={0}
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
                    defaultValue={0}
                    min={0}
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
        <button
          onClick={() => {
            axios
              .post("/api/coach/workouts/test", {
                name: "yes",
                sets: 1,
                exercises: sets,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
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
