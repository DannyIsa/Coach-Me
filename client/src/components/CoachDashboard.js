import React from "react";
import { useHistory } from "react-router-dom";

function CoachDashboard({ auth }) {
  const history = useHistory();

  return (
    <div>
      <h1>Coach Dashboard</h1>
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

export default CoachDashboard;
