import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function Details({ user, auth, userType, setRegistered }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [other, setOther] = useState(false);
  const [birthdate, setBirthdate] = useState("");
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
        <input
          name="name"
          placeholder="Enter Your Full Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="tel"
          name="phone-number"
          placeholder="Enter Your Phone Number"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
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
            setGender(e.target.value);
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
            setGender(e.target.value);
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
            onChange={(e) => {
              setGender(e.target.value);
            }}
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
              onChange={(e) => setHeight(e.target.value)}
            />
            <br />
            <input
              type="number"
              name="weight"
              placeholder="Enter Your Weight (Kg)"
              required
              onChange={(e) => setWeight(e.target.value)}
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
