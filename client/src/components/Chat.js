import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SetErrorContext } from "../App";
import Message from "./Message";

export default function Chat({ userDetails, userType }) {
  const [messages, setMessages] = useState([]);
  const { traineeId, coachId } = useParams();
  const [messageContent, setMessageContent] = useState("");

  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (!userDetails || !traineeId) return;
    if (userType === "Trainee") {
      if (userDetails.id !== Number(traineeId)) return;
      axios
        .get(
          `http://localhost:3001/api/chat/${traineeId}/${userDetails.coach_id}`
        )
        .then(({ data }) => setMessages(data))
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      axios
        .get(`http://localhost:3001/api/chat/${traineeId}/${userDetails.id}`)
        .then(({ data }) => setMessages(data))
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [userDetails]);

  const sendMessage = async () => {
    if (!messageContent || messageContent === "") return;
    try {
      const coachId =
        userType === "Coach" ? userDetails.id : userDetails.coach_id;
      const message = await axios.post(`/api/chat/${traineeId}/${coachId}`, {
        content: messageContent,
        sender: userType,
      });
      setMessages([...messages, message.data]);
      setMessageContent("");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return userDetails && userType ? (
    <div className="chat-component">
      <div>{messages && <h1>messages</h1>}</div>
      <h1>
        HI! {userType} {userDetails.name}!
      </h1>
      <div className="messages-div">
        {messages.map((message) => (
          <Message
            content={message.content}
            date={new Date(message.createdAt)}
            sent={message.sender === userType}
          />
        ))}
      </div>
      <input
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <button onClick={sendMessage}>SEND</button>
    </div>
  ) : (
    <div className="chat-component">"Loading..."</div>
  );
}
