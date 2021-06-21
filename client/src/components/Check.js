import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Check({ user, loading, registered, userType }) {
  const history = useHistory();
  useEffect(() => {
    if (!loading) {
      if (user) {
        if (registered === true) history.push("/home");
        else if (registered === false) history.push("/details");
      } else history.push("/sign-up");
    }
  }, [user, registered]);
  return (
    <div className="home-page">
      <h1 className="headline">Loading...</h1>
    </div>
  );
}

export default Check;
