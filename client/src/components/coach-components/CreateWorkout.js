import React, { useState, useEffect } from "react";
import axios from "axios";
function CreateWorkout() {
  const [exercises, setExercises] = useState([]);
  const [visibleExercises, setVisibleExercises] = useState([]);
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
        setVisibleExercises(data);
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
        setVisibleExercises(data);
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
      <div className="exercises-list">
        {visibleExercises.length > 0
          ? visibleExercises.map((item, index) => (
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
              </div>
            ))
          : "No Exercises"}
      </div>
    </div>
  );
}

export default CreateWorkout;
