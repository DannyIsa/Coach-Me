import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

function SignUp() {
  const [emailInput, setEmailInput] = useState("");
  const [fullNameInput, setFullNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [errorMessage, setError] = useState();
  const [type, setType] = useState("Trainee");
  const passwordRef = useRef();
  const history = useHistory();

  const SignUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (data) => {
        const emailData = data.user.email;
        const userData = data.user.displayName;
        if (type === "Coach") {
          axios
            .post(`/api/user/register?type=${type}`, {
              email: emailData,
              address: addressInput,
              "phone-number": phoneNumberInput,
              name: userData,
            })
            .then(() => {
              history.push("/");
            })
            .catch((err) => {
              setError(err.message);
            });
        } else {
          axios
            .post(`/api/user/register?type=${type}`, {
              email: emailData,
              name: userData,
            })
            .then(() => {
              history.push("/");
            })
            .catch((err) => {
              setError(err.message);
            });
        }
      });
  };

  const SignUpWithPassword = () => {
    const provider = firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        if (type === "Coach") {
          axios
            .post(`/api/user/register?type=${type}`, {
              email: emailInput,
              address: addressInput,
              "phone-number": phoneNumberInput,
              name: fullNameInput,
            })
            .then(() => {
              history.push("/");
            })
            .catch((err) => {
              setError(err.message);
            });
        } else {
          axios
            .post(`/api/user/register?type=${type}`, {
              email: emailInput,
              name: fullNameInput,
            })
            .then(() => {
              history.push("/");
            })
            .catch((err) => {
              setError(err.message);
            });
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="sign-up">
      <input
        name="text"
        type="email"
        placeholder="enter your email"
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      />
      <br />
      <input
        name="text"
        type="text"
        placeholder="enter your Full Name"
        onChange={(e) => {
          setFullNameInput(e.target.value);
        }}
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="enter your password"
        ref={passwordRef}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      />
      <button
        name="show-password"
        className="show-password"
        onMouseDown={() => {
          passwordRef.current.type = "text";
        }}
        onMouseUp={() => {
          passwordRef.current.type = "password";
        }}
        onMouseOut={() => {
          passwordRef.current.type = "password";
        }}
      >
        👁
      </button>
      <div
        value="Trainee"
        onClick={() => setType("Trainee")}
        className={type === "Trainee" ? "chosen" : "not-chosen"}
      >
        Trainee
      </div>
      <div
        value="Coach"
        onClick={() => setType("Coach")}
        className={type === "Coach" ? "chosen" : "not-chosen"}
      >
        Coach
      </div>
      {type === "Coach" && (
        <div>
          <input
            type="text"
            placeholder="enter your address"
            onChange={(e) => {
              setAddressInput(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="enter your phone number"
            onChange={(e) => {
              setPhoneNumberInput(e.target.value);
            }}
          ></input>
        </div>
      )}
      <button onClick={SignUpWithPassword}>Sign Up</button>
      <button name="google" onClick={SignUpWithGoogle} className="google">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chat-service-d13a1.appspot.com/o/google-logo.png?alt=media&token=47d2d019-037d-418c-abef-230317fe1393"
          width="20px"
          height="20px"
        />
        Sign up with google
      </button>
      <button onClick={() => history.push("/sign-in")}>
        Already Registered
      </button>
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  );
}

export default SignUp;
