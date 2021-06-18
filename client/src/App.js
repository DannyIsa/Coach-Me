import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import "./styles/App.css";

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
      <Router>
        <Switch>
          {user ? (
            <Home auth={auth} user={user} />
          ) : (
            <>
              <Route exact path="/">
                <SignIn auth={auth} />
              </Route>
              <Route exact path="/sign-up">
                <SignUp auth={auth} />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
