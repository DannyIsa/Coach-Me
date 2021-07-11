import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SetErrorContext } from "../App";
import Message from "./Message";

export default function Chat({ userDetails, userType, socket }) {
  const [messages, setMessages] = useState([]);
  const { traineeId, coachId } = useParams();
  const [messageContent, setMessageContent] = useState("");

  const setError = useContext(SetErrorContext);

  useEffect(() => {
    if (!userDetails || !traineeId) return;
    if (userType === "Trainee") {
      if (userDetails.id !== Number(traineeId)) return;
      axios
        .get(`http://localhost:3001/api/chat/${traineeId}/${coachId}`)
        .then(({ data }) => setMessages(data))
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      if (userDetails.id !== Number(coachId)) return;
      axios
        .get(`http://localhost:3001/api/chat/${traineeId}/${coachId}`)
        .then(({ data }) => setMessages(data))
        .catch((err) => {
          setError(err.response.data);
        });
    }
  }, [userDetails]);

  useEffect(() => {
    if (!userDetails || !traineeId || messages.length === 0) return;
    socket.on("message received", (data) => {
      if (
        traineeId === data.traineeId &&
        coachId === data.coachId &&
        data.sender !== userType
      )
        setMessages([data, ...messages]);
    });
  }, [userDetails, messages]);

  const sendMessage = async () => {
    if (!messageContent || messageContent === "") return;
    try {
      const message = await axios.post(`/api/chat/${traineeId}/${coachId}`, {
        content: messageContent,
        sender: userType,
      });
      setMessages([message.data, ...messages]);
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
      <h1>
        You are chatting with
        {userType === "Trainee" ? " Coach " + coachId : " Trainee " + traineeId}
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
      <div className="input-and-button">
        <input
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Send Message"
        />
        <button onClick={sendMessage}>SEND</button>
      </div>
    </div>
  ) : (
    <div className="chat-component">"Loading..."</div>
  );
}
