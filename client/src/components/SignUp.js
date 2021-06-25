import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

function SignUp({ setReqDone }) {
  const [emailInput, setEmailInput] = useState("");

  const [passwordInput, setPasswordInput] = useState("");

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
        const { email } = data.user;
        axios
          .post(`http://localhost:3001/api/user/register?type=${type}`, {
            email,
          })
          .then((res) => {
            setReqDone(true);
            firebase.auth().onAuthStateChanged(() => {
              history.push("/");
            });
          })
          .catch((err) => {
            setError(err.message);
          });
      });
  };

  const SignUpWithPassword = () => {
    const provider = firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        axios
          .post(`http://localhost:3001/api/user/register?type=${type}`, {
            email: emailInput,
          })
          .then(() => {
            firebase.auth().onAuthStateChanged(() => {
              setReqDone(true);
              history.push("/");
            });
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="sign-up">
      <section className="main">
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

        <button onClick={SignUpWithPassword}>Sign Up</button>
        <br />
        <button name="google" onClick={SignUpWithGoogle} className="google">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/chat-service-d13a1.appspot.com/o/google-logo.png?alt=media&token=47d2d019-037d-418c-abef-230317fe1393"
            width="20px"
            height="20px"
          />
          Sign up with google
        </button>
        <br />
        <button onClick={() => history.push("/sign-in")}>
          Already Registered?
        </button>
        <br />
        <h2 className="error-message">{errorMessage}</h2>
      </section>
    </div>
  );
}

export default SignUp;
