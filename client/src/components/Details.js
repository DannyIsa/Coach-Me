import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function Details({ user, auth, userType, setRegistered }) {
  const history = useHistory();
  const [other, setOther] = useState(false);
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
      <form
        className="details-form"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          let obj = {
            name: data.get("name"),
            phone_number: data.get("phone-number"),
            gender: data.get("gender"),
            birthdate: data.get("birthdate"),
          };
          if (userType === "Trainee") {
            obj.height = data.get("height");
            obj.weight = data.get("weight");
          }
          const { email } = user;
          axios
            .put("/api/user/details/" + email, { obj, type: userType })
            .then(() => {
              setRegistered(true);
              history.push("/");
            });
        }}
      >
        <input name="name" placeholder="Enter Your Full Name" required />
        <br />
        <input
          type="tel"
          name="phone-number"
          placeholder="Enter Your Phone Number"
          required
        />
        <br />
        <label htmlFor="gender">Male</label>
        <input
          type="radio"
          name="gender"
          value="male"
          required
          onChange={(e) => {
            setOther(false);
          }}
        />
        <label htmlFor="gender">Female</label>
        <input
          type="radio"
          name="gender"
          value="female"
          required
          onChange={(e) => {
            setOther(false);
          }}
        />
        <label htmlFor="gender" required>
          Other
        </label>
        <input
          type="radio"
          name="gender"
          value="other"
          onChange={() => {
            setOther(true);
          }}
        />
        {other && (
          <input
            name="gender"
            required
            placeholder="Enter Your Gender"
            required
          />
        )}
        <br />
        <input type="date" name="birthdate" required />
        <br />

        {userType === "Trainee" && (
          <>
            <input
              type="number"
              name="height"
              placeholder="Enter Your Height (Cm)"
              required
            />
            <br />
            <input
              type="number"
              name="weight"
              placeholder="Enter Your Weight (Kg)"
              required
            />
            <br />
          </>
        )}
        <button type="submit" value="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Details;
