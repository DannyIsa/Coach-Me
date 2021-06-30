import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoachesList from "../trainee-components/CoachesList";

function TraineeRouter({ userDetails }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/trainee/">
          <CoachesList userDetails={userDetails} />
        </Route>
      </Switch>
    </Router>
  );
}

export default TraineeRouter;
