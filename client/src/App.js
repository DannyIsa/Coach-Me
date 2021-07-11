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
import Chat from "./components/Chat";

import TraineeDashboard from "./components/trainee-components/TraineeDashboard";
import CoachDashboard from "./components/coach-components/CoachDashboard";
import CoachRouter from "./components/routers/CoachRouter";
import TraineeRouter from "./components/routers/TraineeRouter";
import { io } from "socket.io-client";
import CoachProfile from "./components/coach-components/CoachProfile";

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
export const SetErrorContext = React.createContext();

function App() {
  const [user, loading] = useAuthState(auth);
  const [registered, setRegistered] = useState();
  const [userType, setUserType] = useState();
  const [userDetails, setUserDetails] = useState();
  const [reqDone, setReqDone] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  function signOut(history) {
    auth.signOut().then(() => {
      auth.onAuthStateChanged(() => {
        setRegistered(undefined);
        setReqDone(false);
        history.push("/");
      });
    });
  }
  const socket = io("http://localhost:8080/", {
    withCredentials: true,
    transport: ["websocket"],
  });

  useEffect(() => {
    if (userDetails) {
      socket.on("message received", (data) => {
        if (data.sender !== userType) {
          console.log(userDetails.id, data.coachId, data.traineeId);
          if (
            (userType === "Coach" && userDetails.id === Number(data.coachId)) ||
            (userType === "Trainee" &&
              userDetails.id === Number(data.traineeId))
          ) {
            if (!window.location.href.includes("chat"))
              setAlertMessage("New Chat Message");
          }
        }
      });
    }
    if (userType === "Coach") {
      socket.on("request received", (data) => {
        if (userDetails.id === data) {
          setAlertMessage("New Alert");
        }
      });
    }
    if (userType === "Trainee") {
      socket.on("request handled", ({ traineeId, coachId, accept }) => {
        if (userDetails.id === traineeId) {
          setAlertMessage(`Request ${accept ? "Accepted" : "Rejected"}`);
          if (accept) setUserDetails({ ...userDetails, coach_id: coachId });
        }
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage();
      }, 7000);
    }
  }, [alertMessage]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage();
      }, 4500);
    }
  }, [errorMessage]);

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
          setErrorMessage(err.response.data);
        });
    }
  }, [user, loading, reqDone]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Router>
        <SetErrorContext.Provider value={setErrorMessage}>
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
                    <NavBarCoach
                      signOut={signOut}
                      userDetails={userDetails}
                      alertMessage={alertMessage}
                    />
                  ) : (
                    <NavBarTrainee
                      userDetails={userDetails}
                      signOut={signOut}
                      alertMessage={alertMessage}
                    />
                  )}
                  <Switch>
                    <Route exact path="/chat/:traineeId/:coachId">
                      <Chat
                        userDetails={userDetails}
                        userType={userType}
                        socket={socket}
                      />
                    </Route>
                    <Route exact path="/dashboard">
                      {userType === "Coach" ? (
                        <CoachProfile
                          userDetails={userDetails}
                          alertMessage={alertMessage}
                        />
                      ) : (
                        <TraineeDashboard userDetails={userDetails} />
                      )}
                    </Route>
                    <Route strict path="/coach">
                      {userType === "Coach" ? (
                        <CoachRouter
                          userDetails={userDetails}
                          alertMessage={alertMessage}
                        />
                      ) : (
                        <Redirect to="/" />
                      )}
                    </Route>
                    <Route strict path="/trainee">
                      {userType === "Trainee" ? (
                        <TraineeRouter
                          userDetails={userDetails}
                          alertMessage={alertMessage}
                        />
                      ) : (
                        <Redirect to="/" />
                      )}
                    </Route>
                  </Switch>
                </>
              ) : (
                // user isn't registered
                <>
                  <Switch>
                    <Route exact path="/details">
                      <Details
                        userDetails={userDetails}
                        userType={userType}
                        setReqDone={setReqDone}
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
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </SetErrorContext.Provider>
      </Router>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      {errorMessage && (
        <div className="error-message-alert">{errorMessage}</div>
      )}
    </div>
  );
}

export default App;
