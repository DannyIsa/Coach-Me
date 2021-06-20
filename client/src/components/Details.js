import React from "react";
import { useHistory } from "react-router-dom";
function Details({ user, auth, userType }) {
  const history = useHistory();
  return (
    <div>
      <h1>Details</h1>
      <button
        onClick={() => {
          auth.signOut();
          history.push("/sign-up");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Details;
