import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Chat.css";
import axios from "axios";

export default function Chat({ userDetails }) {
  const [messages, setMessages] = useState();
  const { coachId } = useParams();

  useEffect(() => {
    if (userDetails && coachId) {
      axios
        .get(`http://localhost:3001/api/chat/${userDetails.id}/${coachId}`)
        .then(({ data }) => console.log(data))
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  }, [userDetails]);

  return (
    <div className="chat-component">
      <div>{messages && <h1>messages</h1>}</div>
      <h1>
        HI! coach-{coachId} trainee-{userDetails.name}
      </h1>
      <input />
      <button>SEND</button>
    </div>
  );
}
