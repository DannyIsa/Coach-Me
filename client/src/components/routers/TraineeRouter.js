import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoachesList from "../trainee-components/CoachesList";
import WeeklyCalendar from "../trainee-components/WeeklyCalendar";

function TraineeRouter({ userDetails, alertMessage }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/trainee/coaches">
          <CoachesList userDetails={userDetails} alertMessage={alertMessage} />
        </Route>
        <Route exact path="/trainee/calendar">
          <WeeklyCalendar userDetails={userDetails} />
        </Route>
      </Switch>
    </Router>
  );
}

export default TraineeRouter;
