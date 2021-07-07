import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../pics/logo.png";
import { SetErrorContext } from "../App";

function Details({ userDetails, userType, setRegistered, setReqDone }) {
  const history = useHistory();
  const [other, setOther] = useState(false);
  const setError = useContext(SetErrorContext);

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
        <h1>Welcome friend!</h1>
        <div className="details-welcome">
          <p>We're happy to have you here!</p>
          <p>Please take a minute to fill in the following details.</p>
        </div>
        <h1>Good luck!</h1>
      </div>
      <div className="right-div">
        <form
          className="details-form"
          onSubmit={(e) => {
            e.preventDefault();
            setReqDone(false);
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
              .catch((err) => setError(err.response.data))
              .finally(() => {
                setReqDone(true);
              });
          }}
        >
          <div className="num1">
            <div className="inputbox">
              <input type="tel" required="required" name="name" />
              <span>Name</span>
            </div>
            <div className="inputbox">
              <input type="text" required="required" name="phone-number" />
              <span>Phone Number</span>
            </div>
          </div>
          <div id="gender-div">
            <div id="gender1">
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
            <div id="gender2">
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
          <div className="num2">
            <div className="inputbox">
              <input
                type="date"
                required="required"
                name="birthdate"
                className="birthday"
              />
              <span>Date of Birth</span>
            </div>
          </div>
          {userType === "Trainee" && (
            <>
              <div className="num3">
                <div className="inputbox">
                  <input type="number" required="required" name="height" />
                  <span>Height (Cm)</span>
                </div>
                <div className="inputbox">
                  <input type="number" required="required" name="weight" />
                  <span>Weight (Kg)</span>
                </div>
              </div>
              <div className="selectbox">
                <select
                  name="activity-level"
                  placeholder="Choose Your Activity Level"
                  required
                >
                  <option disabled selected value>
                    Select Activity Level
                  </option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="LightlyActive">Lightly Active</option>
                  <option value="Active">Active</option>
                  <option value="VeryActive">Very Active</option>
                </select>
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
