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
  const [contactName, setContactName] = useState("");

  const setError = useContext(SetErrorContext);
  console.log(contactName);
  useEffect(() => {
    if (!userDetails || !traineeId) return;
    if (userType === "Trainee") {
      if (userDetails.id !== Number(traineeId)) return;
    } else {
      if (userDetails.id !== Number(coachId)) return;
    }
    axios
      .get(`http://localhost:3001/api/chat/${traineeId}/${coachId}`)
      .then(({ data }) => {
        setMessages(data.messages);
        setContactName(
          userType === "Trainee" ? data.coach_name : data.trainee_name
        );
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [userDetails]);

  useEffect(() => {
    if (!userDetails || !traineeId || messages.length === 0) return;
    socket.on("message received", (data) => {
      if (
        traineeId === data.traineeId &&
        coachId === data.coachId &&
        data.sender !== userType
      ) {
        setMessages([data, ...messages]);
      }
    });
  }, [userDetails, messages]);

  const sendMessage = async (e) => {
    if (!messageContent || messageContent === "") return;
    try {
      const message = await axios.post(`/api/chat/${traineeId}/${coachId}`, {
        content: messageContent,
        sender: userType,
      });
      console.log(message.data);
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
          {userType === "Trainee" ? " coach " : " trainee "}
          {contactName}
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(e);
                e.target.focus();
              }
            }}
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
