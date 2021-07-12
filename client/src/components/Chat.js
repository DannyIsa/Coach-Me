import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SetErrorContext } from "../App";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../socket";
export default function Chat({ userDetails, userType }) {
  const [messages, setMessages] = useState([]);
  const { traineeId, coachId } = useParams();
  const [messageContent, setMessageContent] = useState("");
  const [coachName, setCoachName] = useState("");
  const [traineeName, setTraineeName] = useState("");

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
      axios
        .get(`http://localhost:3001/api/coach/coach-name/${coachId}`)
        .then(({ data }) => setCoachName(data))
        .catch((e) => setError(e.response.data));
    } else {
      if (userDetails.id !== Number(coachId)) return;
      axios
        .get(`http://localhost:3001/api/chat/${traineeId}/${coachId}`)
        .then(({ data }) => setMessages(data))
        .catch((err) => {
          setError(err.response.data);
        });
      axios
        .get(`http://localhost:3001/api/trainee/trainee-name/${coachId}`)
        .then(({ data }) => setTraineeName(data))
        .catch((e) => setError(e.response.data));
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
    <div className="chat-container">
      <div className="chat-component">
        <h1 className="chatting-with">
          You are chatting with
          {userType === "Trainee"
            ? " Coach " + coachName
            : " Trainee " + traineeName}
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
          <button onClick={sendMessage} className="send-chat-btn">
            {" "}
            <FontAwesomeIcon
              icon={faPaperPlane}
              color="black"
              className="fa-fa"
            />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="chat-component">"Loading..."</div>
  );
}
