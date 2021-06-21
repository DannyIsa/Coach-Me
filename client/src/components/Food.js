import React from "react";
import CaloriesTracker from "./CaloriesTracker";

export default function Food({ user }) {
  return (
    <div>
      <h1>This is The Food Page</h1>
      <CaloriesTracker user={user} />
    </div>
  );
}
