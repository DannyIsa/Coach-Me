import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import WeeklyCalendar from "../trainee-components/WeeklyCalendar";
import TraineeProfile from "../trainee-components/TraineeProfile";
import LiveWorkout from "../trainee-components/LiveWorkout";
import CaloriesTracker from "../trainee-components/food-components/CaloriesTracker";
function TraineeRouter({ userDetails, alertMessage }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/trainee/profile">
          <TraineeProfile userDetails={userDetails} />
        </Route>

        <Route exact path="/trainee/calendar">
          <WeeklyCalendar userDetails={userDetails} />
        </Route>
        <Route exact path="/trainee/workout/:workoutId">
          <LiveWorkout userDetails={userDetails} />
        </Route>
        <Route exact path="/trainee/food">
          <CaloriesTracker userDetails={userDetails} />
        </Route>
        <Route exact path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default TraineeRouter;
