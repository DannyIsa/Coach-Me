import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../pics/logo.png";
import couple from "../pics/couple.png";

function Details({ userDetails, userType, setRegistered }) {
  const history = useHistory();
  const [other, setOther] = useState(false);
  return (
    <div className="details-div">
      <div className="left-div">
        <div className="logo-nav">
          <div className="logo-container">
            <a href="#">
              <img src={logo} id="logo" alt="CoachMe Logo" />
            </a>
          </div>
        </div>
        <h1>hello friend 👋</h1>
        <p>
          This is a one-time form, please take a minute to fill in the following
          details.
        </p>
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
          <div className="inputbox">
            <input type="tel" required="required" />
            <span>Name</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" />
            <span>Number</span>
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
                  <input type="text" id="other-input" required="required" />
                  <span>Enter Your Gender</span>
                </div>
              )}
            </div>
          </div>
          <div className="inputbox">
            <input type="date" required="required" />
            <span>Date of Birth</span>
          </div>
          {userType === "Trainee" && (
            <>
              <div className="inputbox">
                <input type="number" required="required" />
                <span>Height (Cm)</span>
              </div>
              <div className="inputbox">
                <input type="number" required="required" />
                <span>Weight (Kg)</span>
              </div>
            </>
          )}
          {/* <button type="submit" value="submit">
          submit
        </button> */}
          <a href="#" type="submit" value="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>
    </div>
  );
}

export default Details;
