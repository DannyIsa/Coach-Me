import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import gif from "../pics/whiteGif.gif";
import "../styles/Check.css";

function Check({ user, loading, registered, userType }) {
  const history = useHistory();
  useEffect(() => {
    if (!loading) {
      if (user) {
        if (registered === true) history.push("/profile");
        else if (registered === false) history.push("/details");
      } else history.push("/home");
    }
  }, [user, loading, registered]);
  return (
    <div className="loading-page">
      <h2 className="headline">
        Wait a minute, <br />
        I'm in the middle of training
      </h2>
      <img src={gif} id="gif" alt="white Gif" />
    </div>
  );
}

export default Check;
