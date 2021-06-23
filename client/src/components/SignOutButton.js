import React from "react";
import { useHistory } from "react-router-dom";
function SignOutButton({ signOut }) {
  const history = useHistory();
  return (
    <button className="sign-out" onClick={() => signOut(history)}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
