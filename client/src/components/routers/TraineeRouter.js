import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WeeklyCalendar from "../trainee-components/WeeklyCalendar";
import WorkoutTimer from "../trainee-components/WorkoutTimer";
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
      </Switch>
    </Router>
  );
}

export default TraineeRouter;
