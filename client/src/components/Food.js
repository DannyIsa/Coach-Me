import React from "react";
import CaloriesTracker from "./food-components/CaloriesTracker";
import NeedToEat from "./food-components/NeedToEat";

export default function Food({ userDetails }) {
  return (
    <div>
      <h1>This is The Food Page</h1>
      <CaloriesTracker userDetails={userDetails} />
      <NeedToEat userDetails={userDetails} />
    </div>
  );
}
