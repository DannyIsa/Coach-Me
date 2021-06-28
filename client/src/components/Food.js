import React from "react";
import CaloriesTracker from "./CaloriesTracker";

export default function Food({ userDetails }) {
  return (
    <div>
      <h1>This is The Food Page</h1>
      <CaloriesTracker userDetails={userDetails} />
    </div>
  );
}
