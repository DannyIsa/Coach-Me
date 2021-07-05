import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CreateWorkoutPopup from "./CreateWorkoutPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CreateWorkout({ userDetails }) {
  const [exercises, setExercises] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState("name");
  const [typeTags, setTypeTags] = useState([]);
  const [muscleTags, setMuscleTags] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);

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
      .catch((err) => console.log(err.response.data));
  }, []);
  useEffect(() => {
    axios
      .get(`/api/coach/exercises/show?input=${searchInput}&sort=${sortValue}`)
      .then(({ data }) => {
        setExercises(data);
      })
      .catch((err) => console.log(err.response.data));
  }, [searchInput, sortValue]);
  return (
    <div className="create-workout-page">
      <div className="main-div">
        {/* <h1>Create a new workout</h1> */}
        {userDetails && (
          <CreateWorkoutPopup
            userDetails={userDetails}
            trigger={popupTrigger}
            setTrigger={setPopupTrigger}
            exercises={chosen}
            setExercises={setChosen}
            edit={false}
          />
        )}
        <div className="search-div">
          <div className="search">
            <input
              placeholder="Search for exercises"
              onFocus={() => {
                setSortValue("name");
                setSearchInput("");
              }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Link to="/coach/add-exercise"> Add Exercise</Link>
          </div>
          <div className="tags">
            <h3>Sort by Exercise Types:</h3>
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
            <h3>Sort by Working Muscles:</h3>
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
        <div className="new-build-workout">
          <h1>New Workout :</h1>
          {chosen.map((item, index) => (
            <div className="chosen-exercise" key={"chosen" + index}>
              {item}
              <button
                onClick={() => {
                  let temp = [...chosen];
                  temp = temp.filter((value) => value !== item);
                  setChosen(temp);
                }}
              >
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
              </button>
            </div>
          ))}
          {chosen.length > 0 && (
            <button
              className="next-button"
              onClick={() => {
                setPopupTrigger(true);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="exercises-list">
        {exercises.length > 0
          ? exercises.map((item, index) => (
              <div
                className="exercise-block"
                key={"exerciseItem" + index}
                // draggable
                // onDragStart={() => {
                //   setDraggedItem(index);
                // }}
              >
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
                  Add
                </button>
              </div>
            ))
          : "No Exercises"}
      </div>
    </div>
  );
}

export default CreateWorkout;
