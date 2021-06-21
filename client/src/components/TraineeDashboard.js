import React from "react";
import { useHistory } from "react-router-dom";

function TraineeDashboard({ signOut }) {
  const history = useHistory();
  return (
    <div>
      <h1>Trainee Dashboard</h1>
      <button onClick={() => signOut(history)}>Sign Out</button>
    </div>
  );
}

export default TraineeDashboard;
