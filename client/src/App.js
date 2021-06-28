import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Check from "./components/Check";
import Details from "./components/Details";
import TraineeDashboard from "./components/trainee-components/TraineeDashboard";
import CoachesList from "./components/trainee-components/CoachesList";
import WorkoutsList from "./components/coach-components/WorkoutsList";
import Food from "./components/Food";

import CoachDashboard from "./components/coach-components/CoachDashboard";
import ClientsList from "./components/coach-components/ClientsList";
import CreateWorkout from "./components/coach-components/CreateWorkout";

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
          console.log(err);
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
                {/* <SignOutButton signOut={signOut} /> */}
                <NavBar userType={userType} signOut={signOut} />
                <Switch>
                  <Route exact path="/profile">
                    {userType === "Coach" ? (
                      <CoachDashboard user={user} userDetails={userDetails} />
                    ) : (
                      <TraineeDashboard user={user} userDetails={userDetails} />
                    )}
                  </Route>
                  {userType === "Coach" && (
                    <Switch>
                      <Route exact path="/coach/clients">
                        <ClientsList userDetails={userDetails} />
                      </Route>
                      <Route exact path="/coach/workouts">
                        <WorkoutsList userDetails={userDetails} />
                      </Route>
                      <Route exact path="/coach/workouts/create">
                        <CreateWorkout userDetails={userDetails} />
                      </Route>
                    </Switch>
                  )}
                  {userType === "Trainee" && (
                    <Route exact path="/trainee/coaches">
                      <CoachesList userDetails={userDetails} />
                    </Route>
                  )}
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
    </div>
  );
}

export default App;
