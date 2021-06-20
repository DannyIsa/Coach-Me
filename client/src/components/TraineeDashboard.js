import React from "react";
import { useHistory } from "react-router-dom";

function TraineeDashboard({ auth }) {
  const history = useHistory();
  return (
    <div>
      <h1>Trainee Dashboard</h1>
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

export default TraineeDashboard;
