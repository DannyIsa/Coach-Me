import React, { useState, useEffect } from "react";

function CreateWorkout() {
  const [inputArray, setInputArray] = useState([0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("yes");
  };

  return (
    <div>
      <h1>Create a new workout</h1>
      <form className="workout-form" onSubmit={handleSubmit}>
        {inputArray.map((value, index) => (
          <div className="exercise-set-block" key={"exercise-set" + index}>
            <input
              name={`name${index}`}
              placeholder="Enter Exercise Name"
              required
            />
            <input
              type="number"
              name={`sets${index}`}
              defaultValue={1}
              min={0}
              max={20}
              required
            />
            <input
              type="number"
              name={`weight${index}`}
              defaultValue={0}
              min={0}
              required
            />
            <input
              type="number"
              name={`min${index}`}
              defaultValue={1}
              min={0}
              required
            />
            <input
              type="number"
              name={`max${index}`}
              defaultValue={1}
              min={0}
              required
            />
            <input
              type="number"
              name={`rest${index}`}
              defaultValue={1}
              min={0}
              required
            />
          </div>
        ))}

        <button
          onClick={(e) => {
            e.preventDefault();
            if (inputArray.length === 10) return;
            let array = [...inputArray];
            array.push(0);
            setInputArray(array);
          }}
        >
          +
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (inputArray.length === 1) return;
            let array = [...inputArray];
            array.pop();
            setInputArray(array);
          }}
        >
          -
        </button>
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreateWorkout;
