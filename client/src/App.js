import "./App.css";
import Login from "./components/Login";
import SignUpTrainee from "./components/SignUpTrainee";
import SignUpCoach from "./components/SignUpCoach";

import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [user] = useAuthState(auth);
  return (
    <div>
      {user ? (
        <Router>
          <h1>hello {user.displayName}</h1>
          <button className="sign-out-button" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </Router>
      ) : (
        <div>
          <Router>
            <ul>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/sign-up-coach">Sign Up as Trainee</Link>
              </li>
              <li>
                <Link to="/sign-up-trainee">Sign Up as Coach</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/login">
                <Login auth={auth} />
              </Route>
              <Route exact path="/sign-up-coach">
                <SignUpCoach auth={auth} />
              </Route>
              <Route exact path="/sign-up-trainee">
                <SignUpTrainee auth={auth} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
