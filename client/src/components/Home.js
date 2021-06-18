import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Home({ user, auth }) {
  return (
    <div>
      <nav>
        <Router>
          <ul>
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Workout</Link>
            </li>
            <li>
              <Link>Food</Link>
            </li>
            <li>
              <Link>Coach</Link>
            </li>
          </ul>
          <Switch>
            <Route></Route>
          </Switch>
        </Router>
      </nav>
      <h1>Home hello {user.displayName}</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
