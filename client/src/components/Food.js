import React from "react";
import CaloriesTracker from "./food-components/CaloriesTracker";
import NeedToEat from "./food-components/NeedToEat";

export default function Food({ userDetails }) {
  return (
    <div>
      <CaloriesTracker userDetails={userDetails} />
      <NeedToEat userDetails={userDetails} />
    </div>
  );
}
