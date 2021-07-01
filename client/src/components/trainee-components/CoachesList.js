import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import {} from "react-router-dom";
import CoachCard from "./CoachCard.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

// function CoachesList({ userDetails, alertMessage }) {
//   const [coaches, setCoaches] = useState();
//   const [request, setRequest] = useState();

//   useEffect(async () => {
//     if (alertMessage) if (!alertMessage.startsWith("Request")) return;
//     if (!userDetails) return;
//     let coachesData = (await axios.get("/api/coach/show/all")).data;
//     setCoaches(coachesData);
//     let requestData = (
//       await axios.get("/api/trainee/request/show/" + userDetails.id)
//     ).data;
//     if (requestData) setRequest(requestData);
//   }, [userDetails, alertMessage]);

//   function sendRequest(coachId, traineeId, traineeName) {
//     const content = prompt("Enter Your Request Content");
//     if (!content) return;
//     axios
//       .post(`/api/trainee/request/send/${traineeId}`, {
//         coachId,
//         traineeName,
//         content,
//       })
//       .then(({ data }) => {
//         setRequest(data);
//       })
//       .catch((err) => console.log(err.response.data));
//   }
// }
const db = [
  {
    name: "Richard Hendricks",
    url: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];

const alreadyRemoved = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced() {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };
  // }
  return (
    <div className="coaches-list">
      {/* <h1>Coaches:</h1>
      {coaches && request
        ? coaches.map((item, index) => (
            <div className="coaches-item" key={"C" + index}>
              <h3>{item.name}</h3>
              {item.id === userDetails.coach_id ? (
                "Your Coach"
              ) : item.id === request.coach_id ? (
                "Request Pending"
              ) : (
                <button
                  onClick={() =>
                    sendRequest(item.id, userDetails.id, userDetails.name)
                  }
                >
                  Send Request
                </button>
              )} */}
      <div>
        <div className="cardContainer">
          {characters.map((character, index) => (
            <CoachCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{
                  backgroundImage: "url(" + character.url + ")",
                }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </CoachCard>
          ))}
        </div>
        <div className="buttons">
          <button onClick={() => swipe("left")} className="xButton">
            {" "}
            <FontAwesomeIcon icon={faTimes} color="#acacac" className="fa-fa" />
          </button>
          <button onClick={() => swipe("right")} id="vButton">
            {" "}
            <FontAwesomeIcon icon={faCheck} color="#acacac" className="fa-fa" />
          </button>
        </div>
        {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText">
            Swipe a card or press a <br /> button to get started!
          </h2>
        )}
      </div>
      {/* </div> */}
      {/* )) : "Loading..."} */}
    </div>
  );
}
export default Advanced;
