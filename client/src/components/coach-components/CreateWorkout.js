import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k + offset}`,
//     content: `item ${k + offset}`,
//   }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

// class CreateWorkout extends Component {
//   state = {
//     items: getItems(10),
//     selected: getItems(5, 10),
//   };

//   /**
//    * A semi-generic way to handle multiple lists. Matches
//    * the IDs of the droppable container to the names of the
//    * source arrays stored in the state.
//    */
//   id2List = {
//     droppable: "items",
//     droppable2: "selected",
//   };

//   getList = (id) => this.state[this.id2List[id]];

//   onDragEnd = (result) => {
//     const { source, destination } = result;

//     // dropped outside the list
//     if (!destination) {
//       return;
//     }

//     if (source.droppableId === destination.droppableId) {
//       const items = reorder(
//         this.getList(source.droppableId),
//         source.index,
//         destination.index
//       );

//       let state = { items };

//       if (source.droppableId === "droppable2") {
//         state = { selected: items };
//       }

//       this.setState(state);
//     } else {
//       const result = move(
//         this.getList(source.droppableId),
//         this.getList(destination.droppableId),
//         source,
//         destination
//       );

//       this.setState({
//         items: result.droppable,
//         selected: result.droppable2,
//       });
//     }
//   };

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="droppable2">
//           {(provided, snapshot) => (
//             <div
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.selected.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   }
// }
import WorkoutPopup from "./WorkoutPopup";
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
          <WorkoutPopup
            userDetails={userDetails}
            trigger={popupTrigger}
            setTrigger={setPopupTrigger}
            exercises={chosen}
            setExercises={setChosen}
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
