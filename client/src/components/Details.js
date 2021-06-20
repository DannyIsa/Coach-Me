import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function Details({ user, auth, userType }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div>
      <h1>Details</h1>
      <button
        onClick={() => {
          auth.signOut();
          history.push("/sign-up");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Details;
