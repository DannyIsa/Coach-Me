import React from "react";

function CoachDashboard({ userDetails }) {
  return (
    <div className="coach-dashboard">
      {userDetails ? (
        <>
          <h1>{`Hello Coach ${userDetails.name}`}</h1>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default CoachDashboard;
