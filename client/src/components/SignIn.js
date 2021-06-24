import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

function SignIn({ signOut }) {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setError] = useState();

  const passwordRef = useRef();

  const signInWithPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        firebase.auth().onAuthStateChanged(() => {
          history.push("/");
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="sign-in">
      <input
        type="email"
        name="text"
        placeholder="enter your email"
        onChange={(e) => {
          setEmailInput(e.target.value);
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
      <br />
      <button onClick={signInWithPassword}>Sign In</button>
      <br />

      <br />

      <button onClick={() => history.push("/sign-up")}>Not Registered?</button>
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  );
}

export default SignIn;
