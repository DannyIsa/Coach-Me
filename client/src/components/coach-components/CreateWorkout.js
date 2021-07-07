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
  const [draggedItem, setDraggedItem] = useState();
  const [draggedOver, setDraggedOver] = useState(false);
  const [chosenWorkout, setChosenWorkout] = useState();
  const [snap, setSnap] = useState();
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
    if (draggedOver && draggedItem) setSnap(draggedItem);
  }, [draggedItem, draggedOver]);
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
    <div
      className="create-workout-page"
      onDragEnter={(e) => {
        if (
          e.target.className === "main-div" ||
          e.target.className === "create-workout-page"
        ) {
          setSnap();
        }
      }}
    >
      <h1>Create a new workout</h1>
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
        </div>
        <div className="tags">
          <h3>Sort by Exercise Types:</h3>
          <div className="types">
            {typeTags.map((item, index) => (
              <strong
                key={"typeTag" + index}
                className={`${item} tag`}
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
              <span
                key={"muscleTag" + index}
                className={`${item} tag`}
                onClick={() => {
                  setSortValue("muscle");
                  setSearchInput(item);
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <Link to="/coach/add-exercise"> Add Exercise</Link>
        </div>
      </div>
      <div className="exercises-container">
        <div className="exercises-left">
          {exercises.length > 0
            ? exercises.map((item, index) => (
                <div
                  className="exercise-block"
                  key={"exerciseItem" + index}
                  draggable={true}
                  onDragStart={() => {
                    setDraggedItem(item);
                  }}
                  onDragEnd={() => {
                    setDraggedItem();
                    if (!snap) return;
                    let temp = [...chosen];
                    if (temp.includes(snap.name) || temp.length === 10) return;
                    temp.push(snap.name);
                    setChosen(temp);
                  }}
                  onClick={() => setChosenWorkout(item)}
                >
                  <h2 className="exercise-name">{item.name} </h2>
                </div>
              ))
            : "No Exercises"}
        </div>
        <div className="exercise-middle">
          {chosenWorkout ? (
            <>
              <h2 className="exercise-name">{chosenWorkout.name}</h2>
              <img
                className="exercise-image"
                src={chosenWorkout.image}
                alt={chosenWorkout.name}
              />
              <h4 className="exercise-category">
                {chosenWorkout.muscle}: {chosenWorkout.type}
              </h4>
              <h4 className="exercise-equipment">{chosenWorkout.equipment}</h4>
              <p className="exercise-description">
                {chosenWorkout.description
                  ? chosenWorkout.description
                  : "no description"}
              </p>
            </>
          ) : (
            <p>Tap on exercise to see more details!</p>
          )}
        </div>
        <div
          className="exercise-right"
          onDragOver={() => {
            setDraggedOver(true);
          }}
          onDragLeave={() => {
            setDraggedOver(false);
          }}
        >
          <h1>New Workout :</h1>
          {chosen.length > 0 ? (
            chosen.map((item, index) => (
              <div className="chosen-exercise" key={"chosen" + index}>
                {item}
                <button
                  onClick={() => {
                    let temp = [...chosen];
                    temp = temp.filter((value) => value !== item);
                    setChosen(temp);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))
          ) : (
            <p>Drag an exercise from the list and drop it here</p>
          )}
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
    </div>
  );
}

export default CreateWorkout;
