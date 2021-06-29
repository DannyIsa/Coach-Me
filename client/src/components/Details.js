import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../pics/logo.png";
import couple from "../pics/couple.png";

function Details({ userDetails, userType, setRegistered }) {
  const history = useHistory();
  const [other, setOther] = useState(false);
  console.log(userDetails);
  return (
    <div className="details-div">
      <div className="left-div">
        <div className="logo-nav">
          <div className="logo-container">
            <a href="/">
              <img src={logo} id="logo" alt="CoachMe Logo" />
            </a>
          </div>
        </div>
        <h1>Welcome friend 👋</h1>
        <div className="details-welcome">
          <p>We are happy to have you here!</p>
          <p>Please take a minute to fill in the following details.</p>
          <p>Good luck!</p>
        </div>
        <img src={couple} id="couple" alt="couple training" />
      </div>
      <div className="right-div">
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
              obj.activity_level = data.get("activity-level");
            }
            axios
              .put("http://localhost:3001/api/user/details/" + userDetails.id, {
                obj,
                type: userType,
              })
              .then(() => {
                setRegistered(true);
                history.push("/");
              })
              .catch((err) => console.log(err.response.data));
          }}
        >
          <div className="num1">
            <div className="inputbox">
              <input type="tel" required="required" name="name" />
              <span>Name</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" name="phone-number" />
              <span>Number</span>
            </div>
          </div>
          <div id="gender-div">
            <div>
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
            </div>
            <div>
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
                <div className="inputbox">
                  <input
                    type="text"
                    id="other-input"
                    required="required"
                    name="gender"
                  />
                  <span>Gender</span>
                </div>
              )}
            </div>
          </div>
          <div className="num1">
            <div className="inputbox">
              <input type="date" required="required" name="birthdate" />
              <span>Date of Birth</span>
            </div>
          </div>
          {userType === "Trainee" && (
            <>
              <div className="num1">
                <div className="inputbox">
                  <input type="number" required="required" name="height" />
                  <span>Height (Cm)</span>
                </div>
                <div className="inputbox">
                  <input type="number" required="required" name="weight" />
                  <span>Weight (Kg)</span>
                </div>
                <div className="selectbox">
                  <select
                    name="activity-level"
                    placeholder="Choose Your Activity Level"
                    required
                  >
                    <option value="Sedentary">Sedentary</option>
                    <option value="LightlyActive">Lightly Active</option>
                    <option value="Active">Active</option>
                    <option value="VeryActive">Very Active</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <button type="submit" value="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Details;
