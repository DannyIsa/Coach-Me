import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import "../styles/HomePage.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// import run from "../pics/web.mp4";
import run from "../pics/home.mp4";
import logo from "../pics/logo.png";

function HomePage({}) {
  return (
    <div className="homepage">
      <nav class="navigation">
        <a href="#" class="navbar-logo">
          <img src={logo} id="logo" />
        </a>
        <div class="navbar-right">
          <a href="#">Home</a>
          <a href="#">How It Works</a>
          <a href="#">About</a>
          <a href="#" className="login">
            Login
          </a>
        </div>
      </nav>

      <video autoPlay muted loop id="myVideo">
        <source src={run} type="video/mp4" />
      </video>
      {/* <div id="welcome">
        <h1>Welcome To Coach Me</h1>
        <h2>Online coaching was never easier</h2>
      </div> */}
      <div className="viewport-header">
        <h1>
          Explore
          <span>Montana</span>
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
