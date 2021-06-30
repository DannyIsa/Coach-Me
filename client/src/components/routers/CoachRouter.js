import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ClientsList from "../coach-components/ClientsList";
import CreateWorkout from "../coach-components/CreateWorkout";
import AddExercise from "../coach-components/AddExercise";
import WorkoutsList from "../coach-components/WorkoutsList";

function CoachRouter({ userDetails }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/coach/clients">
          <ClientsList userDetails={userDetails} />
        </Route>
        <Route exact path="/coach/workouts">
          <WorkoutsList userDetails={userDetails} />
        </Route>
        <Route exact path="/coach/workouts/create">
          <CreateWorkout userDetails={userDetails} />
        </Route>
        <Route exact path="/coach/add-exercise">
          <AddExercise userDetails={userDetails} />
        </Route>
      </Switch>
    </Router>
  );
}

export default CoachRouter;
