import React, { useState, useEffect } from "react";
import axios from "axios";
function CreateWorkout() {
  const [exercises, setExercises] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    axios
      .get(`/api/coach/exercises/show?input=${searchInput}&sort=${sortValue}`)
      .then(({ data }) => {
        setExercises(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Create a new workout</h1>
      <div className="exercises-list">
        {exercises.map((item, index) => (
          <div className="exercise-block" key={"exerciseItem" + index}>
            <h4 className="exercise-name">{item.name}</h4>
            <img className="exercise-image" src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateWorkout;
