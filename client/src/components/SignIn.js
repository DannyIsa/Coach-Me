import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

function SignIn() {
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

  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (data) => {
        console.log("2");
        const { email } = data.user;
        axios
          .post("/api/user/login", {
            email,
          })
          .then((res) => {
            console.log(res);
            // if ()
            // firebase.auth().onAuthStateChanged(() => {
            //   history.push("/");
            // });
          })
          .catch((err) => {
            setError(err.message);
          });
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
      <button name="google" onClick={SignInWithGoogle} className="google">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chat-service-d13a1.appspot.com/o/google-logo.png?alt=media&token=47d2d019-037d-418c-abef-230317fe1393"
          width="20px"
          height="20px"
        />
        Sign In with google
      </button>
      <br />

      <button onClick={() => history.push("/sign-up")}>Not Registered?</button>
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  );
}

export default SignIn;
