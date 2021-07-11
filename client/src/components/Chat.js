import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../styles/Chat.css";
import axios from "axios";
import { SetErrorContext } from "../App";

export default function Chat({ userDetails, userType, socket }) {
  const [messages, setMessages] = useState([]);
  const { traineeId } = useParams();

  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (!userDetails || !traineeId) return;
    if (userType === "Trainee") {
      if (userDetails.id !== traineeId) return;
      axios
        .get(
          `http://localhost:3001/api/chat/${traineeId}/${userDetails.coach_id}`
        )
        .then(({ data }) => console.log(data))
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      axios
        .get(`http://localhost:3001/api/chat/${traineeId}/${userDetails.id}`)
        .then(({ data }) => console.log(data))
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [userDetails]);
  return userDetails && userType ? (
    <div className="chat-component">
      <div>{messages && <h1>messages</h1>}</div>
      <h1>
        HI! {userType} {userDetails.name}!
      </h1>
      <div className="messages-div"></div>
      <input />
      <button>SEND</button>
    </div>
  ) : (
    <div className="chat-component">"Loading..."</div>
  );
}
