import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Food from "./components/Food";
import Check from "./components/Check";
import Details from "./components/Details";
import TraineeDashboard from "./components/TraineeDashboard";
import CoachDashboard from "./components/CoachDashboard";

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
  useEffect(() => {
    if (!user) return;
    const { email } = user;
    axios
      .get("/api/user/check/" + email)
      .then(({ data }) => {
        setUserType(data.type);
        setRegistered(data.valid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

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
              <Switch>
                <Route exact path="/home">
                  {userType === "Coach" ? (
                    <CoachDashboard auth={auth} />
                  ) : (
                    <TraineeDashboard auth={auth} />
                  )}
                </Route>
                <Route exact path="/food">
                  <Food />
                </Route>
              </Switch>
            ) : (
              // user isn't registered
              <Switch>
                <Route exact path="/details">
                  <Details
                    user={user}
                    auth={auth}
                    userType={userType}
                    setRegistered={setRegistered}
                  />
                </Route>
              </Switch>
            )
          ) : (
            <Switch>
              {/* user isn't logged in */}
              <Route exact path="/sign-in">
                <SignIn auth={auth} />
              </Route>
              <Route exact path="/sign-up">
                <SignUp auth={auth} />
              </Route>
            </Switch>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
