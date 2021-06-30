import "./styles/App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import NavBarTrainee from "./components/trainee-components/NavBarTrainee";
import NavBarCoach from "./components/coach-components/NavBarCoach";
import Check from "./components/Check";
import Details from "./components/Details";
import Food from "./components/Food";

import TraineeDashboard from "./components/trainee-components/TraineeDashboard";
import CoachDashboard from "./components/coach-components/CoachDashboard";
import CoachRouter from "./components/routers/CoachRouter";
import TraineeRouter from "./components/routers/TraineeRouter";
import { io } from "socket.io-client";

firebase.initializeApp({
  apiKey: "AIzaSyDXQY7ezPYUQoh3yJmWRZEalb9N-yieW-o",
  authDomain: "coach-me-7bdf4.firebaseapp.com",
  projectId: "coach-me-7bdf4",
  storageBucket: "coach-me-7bdf4.appspot.com",
  messagingSenderId: "145352128312",
  appId: "1:145352128312:web:5544e8d22f7b7f2de873cd",
  measurementId: "G-4H6T593131",
});

const auth = firebase.auth();

function App() {
  const [user, loading] = useAuthState(auth);
  const [registered, setRegistered] = useState();
  const [userType, setUserType] = useState();
  const [userDetails, setUserDetails] = useState();
  const [reqDone, setReqDone] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  function signOut(history) {
    auth.signOut().then(() => {
      auth.onAuthStateChanged(() => {
        setRegistered(undefined);
        setReqDone(false);
        history.push("/");
      });
    });
  }

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("alert", (data) => {
      console.log(data);
      setAlertMessage(data);
    });
    if (userType === "Coach") {
      socket.on("request received", (data) => {
        if (userDetails.id === data) {
          setAlertMessage("New Alert");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage();
      }, 10000);
    }
  }, [alertMessage]);
  useEffect(() => {
    if (user && reqDone) {
      const { email } = user;
      axios
        .get("http://localhost:3001/api/user/check/" + email)
        .then(({ data }) => {
          setUserType(data.type);
          setRegistered(data.valid);
          setUserDetails({ ...data.details });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [user, loading, reqDone]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Check
              user={user}
              loading={loading}
              registered={registered}
              userType={userType}
            />
          </Route>
          {/* user is logged in */}
          {user ? (
            // user is registered
            registered ? (
              <>
                {userType === "Coach" ? (
                  <NavBarCoach userType={userType} signOut={signOut} />
                ) : (
                  <NavBarTrainee userType={userType} signOut={signOut} />
                )}
                <Switch>
                  <Route exact path="/profile">
                    {userType === "Coach" ? (
                      <CoachDashboard user={user} userDetails={userDetails} />
                    ) : (
                      <TraineeDashboard user={user} userDetails={userDetails} />
                    )}
                  </Route>
                  <Route strict path="/coach">
                    {userType === "Coach" ? (
                      <CoachRouter userDetails={userDetails} />
                    ) : (
                      <Redirect to="/" />
                    )}
                  </Route>
                  <Route strict path="/trainee">
                    {userType === "Trainee" ? (
                      <TraineeRouter userDetails={userDetails} />
                    ) : (
                      <Redirect to="/" />
                    )}
                  </Route>
                  <Route exact path="/food">
                    <Food userDetails={userDetails} />
                  </Route>
                </Switch>
              </>
            ) : (
              // user isn't registered
              <>
                {/* <SignOutButton signOut={signOut} /> */}
                <Switch>
                  <Route exact path="/details">
                    <Details
                      userDetails={userDetails}
                      userType={userType}
                      setRegistered={setRegistered}
                    />
                  </Route>
                </Switch>
              </>
            )
          ) : (
            <Switch>
              {/* user isn't logged in */}
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/sign-up">
                <SignUp setReqDone={setReqDone} auth={auth} />
              </Route>
            </Switch>
          )}
        </Switch>
      </Router>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
    </div>
  );
}

export default App;
