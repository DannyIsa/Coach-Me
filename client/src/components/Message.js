import React, { useState, useEffect } from "react";

function Message({ content, sent, date }) {
  return (
    <div className="message-div">
      <div className={`message ${sent ? "sent" : "received"}`}>
        <p className="content">{content}</p>
        <h5 className="time">{`[${date.toLocaleTimeString("it-IT")}]`}</h5>
      </div>
    </div>
  );
}

export default Message;
