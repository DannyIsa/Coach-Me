import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

function SignUp() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setError] = useState();
  const [coachOrTrainee, setCoachOrTrainee] = useState("");
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
        axios
          .post(`/api/user/register?type=${coachOrTrainee}`)
          .then(() => {
            history.push("/");
          })
          .catch((err) => {
            setError(err.message);
          });
      });
  };

  const SignUpWithPassword = () => {
    const provider = firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput, passwordInput);
    axios
      .post(`/api/user/register?type=${coachOrTrainee}`)

      .then(async () => {
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const onChangeValue = (event) => {
    setCoachOrTrainee(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="sign-up">
      {" "}
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
        onClick={() => setCoachOrTrainee("Trainee")}
        className={coachOrTrainee === "Trainee" ? "chosen" : "not-chosen"}
      >
        Trainee
      </div>
      <div
        value="Coach"
        onClick={() => setCoachOrTrainee("Coach")}
        className={coachOrTrainee === "Coach" ? "chosen" : "not-chosen"}
      >
        Coach
      </div>
      <button onClick={SignUpWithPassword}>Sign Up</button>
      <button name="google" onClick={SignUpWithGoogle} className="google">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chat-service-d13a1.appspot.com/o/google-logo.png?alt=media&token=47d2d019-037d-418c-abef-230317fe1393"
          width="20px"
          height="20px"
        />
        Sign up with google
      </button>
      <button onClick={() => history.push("/")}>Already Signed Up</button>
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  );
}

export default SignUp;
