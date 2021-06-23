import React from "react";
import { Link } from "react-router-dom";

function TraineeDashboard() {
  return (
    <div>
      <h1>Trainee Dashboard</h1>
      <Link to="/trainee/coaches">Coaches</Link>
    </div>
  );
}

export default TraineeDashboard;
