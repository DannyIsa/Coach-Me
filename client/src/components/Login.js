import React, { useRef } from "react";

export default function Login() {
  const emailInput = useRef("");
  const passwordInput = useRef("");
  return (
    <div>
      <p>Email:</p>
      <input type="email" ref={emailInput}></input>
      <p>Password:</p>
      <input type="password" ref={passwordInput}></input>
    </div>
  );
}
