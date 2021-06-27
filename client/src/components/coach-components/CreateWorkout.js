import React, { useState, useEffect } from "react";
import axios from "axios";
function CreateWorkout() {
  const [exercises, setExercises] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState("name");
  const [typeTags, setTypeTags] = useState([]);
  const [muscleTags, setMuscleTags] = useState([]);

  function addItem(array, str) {
    if (str.includes(",")) {
      str = str.split(",");
      str.map((value) => {
        if (!array.includes(value)) array.push(value);
      });
    } else if (!array.includes(str)) array.push(str);
    return array;
  }

  useEffect(() => {
    axios
      .get(`/api/coach/exercises/show?input=${searchInput}&sort=${sortValue}`)
      .then(({ data }) => {
        setExercises(data);
        let typeArray = [];
        let muscleArray = [];
        data.map((item) => {
          addItem(muscleArray, item.muscle);
          addItem(typeArray, item.type);
        });
        setTypeTags(typeArray);
        setMuscleTags(muscleArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/coach/exercises/show?input=${searchInput}&sort=${sortValue}`)
      .then(({ data }) => {
        setExercises(data);
      })
      .catch((err) => console.log(err));
  }, [searchInput, sortValue]);
  return (
    <div className="create-workout-page">
      <h1>Create a new workout</h1>
      <div className="search-div">
        <input
          placeholder="Search for exercises"
          onFocus={() => {
            setSortValue("name");
            setSearchInput("");
          }}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <br />
        <div className="tags">
          <h3>Exercise Types:</h3>
          <div className="types">
            {typeTags.map((item, index) => (
              <strong
                key={"typeTag" + index}
                className="type tag"
                onClick={() => {
                  setSortValue("type");
                  setSearchInput(item);
                }}
              >
                {item}
              </strong>
            ))}
          </div>
          <h3>Working Muscles:</h3>
          <div className="muscles">
            {muscleTags.map((item, index) => (
              <strong
                key={"muscleTag" + index}
                className="muscle tag"
                onClick={() => {
                  setSortValue("muscle");
                  setSearchInput(item);
                }}
              >
                {item}
              </strong>
            ))}
          </div>
        </div>
      </div>
      <br />
      <form
        className="chosen-exercises"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          chosen.map((value) => {
            console.log(data.get("min-reps" + value));
          });
        }}
      >
        <h1>New Workout</h1>
        {chosen.map((item, index) => (
          <div className="chosen-exercise">
            {item}{" "}
            <input
              type="number"
              name={"min-reps-" + item}
              defaultValue={0}
              min={0}
              required
            />
            <input
              type="number"
              name={"max-reps-" + item}
              defaultValue={0}
              min={0}
              required
            />
            <input
              type="number"
              name={"sets-" + item}
              defaultValue={0}
              min={0}
              required
            />
            <input
              type="number"
              name={"rest-" + item}
              defaultValue={0}
              min={0}
              required
            />
            <input
              type="number"
              name={"weight-" + item}
              defaultValue={0}
              min={0}
            />
            <button
              onClick={() => {
                let temp = [...chosen];
                temp = temp.filter((value) => value !== item);
                setChosen(temp);
              }}
            >
              [X]
            </button>
          </div>
        ))}
        {chosen.length > 0 && <button>Create Workout</button>}
      </form>
      <div className="exercises-list">
        {exercises.length > 0
          ? exercises.map((item, index) => (
              <div className="exercise-block" key={"exerciseItem" + index}>
                <h2 className="exercise-name">{item.name}</h2>
                <img
                  className="exercise-image"
                  src={item.image}
                  alt={item.name}
                />
                <h4 className="exercise-category">
                  {item.muscle}: {item.type}
                </h4>
                <h4 className="exercise-equipment">{item.equipment}</h4>
                <p className="exercise-description">
                  {item.description ? item.description : "no description"}
                </p>
                <button
                  onClick={() => {
                    let temp = [...chosen];
                    if (temp.includes(item.name) || temp.length === 10) return;
                    temp.push(item.name);
                    setChosen(temp);
                  }}
                >
                  add exercise
                </button>
              </div>
            ))
          : "No Exercises"}
      </div>
    </div>
  );
}

export default CreateWorkout;
