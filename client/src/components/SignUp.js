import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faGithub,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

function SignUp({ setReqDone }) {
  const [mode, setMode] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [errorMessage, setError] = useState();
  const [type, setType] = useState("Trainee");
  const passwordRef = useRef();
  const history = useHistory();

  const SignUpWithGoogle = () => {
    setReqDone(false);
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
          .then(() => {
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

  const SignUpWithFacebook = () => {
    setReqDone(false);
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (data) => {
        const { email } = data.user;
        axios
          .post(`http://localhost:3001/api/user/register?type=${type}`, {
            email,
          })
          .then(() => {
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

  // const SignUpWithFacebook = () => {
  //   const facebookProvider = new firebase.auth.FacebookAuthProvider();
  //   facebookProvider.addScope("email");
  //   firebase.auth().signInWithPopup(facebookProvider);
  // };

  const SignUpWithPassword = () => {
    setReqDone(false);
    firebase
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
  const signInWithPassword = () => {
    setReqDone(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        setReqDone(true);
        firebase.auth().onAuthStateChanged(() => {
          history.push("/");
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className={`container ${mode}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={(e) => e.preventDefault()} className="sign-in-form">
            <h2 className="title">Sign in to CoachMe</h2>
            <div className="input-field">
              <FontAwesomeIcon
                icon={faEnvelope}
                color="#acacac"
                className="fa-fa"
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon
                icon={faLock}
                color="#acacac"
                className="fa-fa"
              />
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
            </div>
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
              See before you go <FontAwesomeIcon icon={faEye} />
            </button>

            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={signInWithPassword}
            />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </form>
          <form onSubmit={(e) => e.preventDefault()} className="sign-up-form">
            <h2 className="title">Create Account</h2>
            {/* <div className="input-field">
              <input type="text" placeholder="Username" />
            </div> */}
            <div className="input-field">
              <FontAwesomeIcon
                icon={faEnvelope}
                color="#acacac"
                className="fa-fa"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon
                icon={faLock}
                color="#acacac"
                className="fa-fa"
              />
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
            </div>
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
              See before you go <FontAwesomeIcon icon={faEye} />
            </button>
            <div className="role">
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
            </div>
            <input
              type="submit"
              className="btn"
              value="Sign up"
              onClick={SignUpWithPassword}
            />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon" onClick={SignUpWithGoogle}>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social-icon" onClick={SignUpWithFacebook}>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Enter your personal details and start journey with us</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setMode("sign-up-mode")}
            >
              Sign up
            </button>
            <h2 className="error-message">{errorMessage}</h2>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setMode("")}
            >
              Sign in
            </button>
            <h2 className="error-message">{errorMessage}</h2>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
