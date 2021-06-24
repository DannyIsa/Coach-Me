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
// import run from "../pics/video.mp4";
import logo from "../pics/logo.png";
import run from "../pics/run.mp4";

function HomePage({}) {
  return (
    <div>
      <video autoPlay muted loop id="myVideo">
        <source src={run} type="video/mp4" />
      </video>
      <img src={logo} id="logo" />
      <section id="welcome">{/* <h1>welcome to the family</h1> */}</section>
      {/* <h1>Welcome To Coach Me</h1>
      <h2>Online coaching was never easier</h2> */}
    </div>
  );
}

export default HomePage;
