import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { SetErrorContext } from "../../App";
import TraineeLogs from "../TraineeLogs";

function TraineeDashboard({ userDetails }) {
  return (
    <div className="trainee-dashboard">
      {userDetails ? (
        <TraineeLogs userDetails={userDetails} type="Trainee" />
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TraineeDashboard;
