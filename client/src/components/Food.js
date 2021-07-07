import React from "react";
import CaloriesTracker from "./food-components/CaloriesTracker";

export default function Food({ userDetails }) {
  return (
    <div>
      <CaloriesTracker userDetails={userDetails} />
    </div>
  );
}
