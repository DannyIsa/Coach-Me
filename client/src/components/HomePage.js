import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

function HomePage({ }) {
  return (
    <div>
      <h1>Welcome To Coach Me</h1>
      <h2>Online coaching was never easier</h2>
    </div>
  );
}

export default HomePage;
