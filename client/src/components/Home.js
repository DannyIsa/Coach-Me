import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Home({ user, auth }) {
  const history = useHistory();
  return (
    <div>
      <nav>
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
      </nav>
      <h1>Home hello {user.displayName}</h1>
      <button
        onClick={() => {
          auth.signOut();
          history.push("/sign-up");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
