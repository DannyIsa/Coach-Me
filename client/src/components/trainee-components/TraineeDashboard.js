import React from "react";

function TraineeDashboard({ userDetails }) {
  return (
    <div className="coach-dashboard">
      {userDetails ? (
        <>
          <h1>{`Hello Trainee ${userDetails.name}`}</h1>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeDashboard;
