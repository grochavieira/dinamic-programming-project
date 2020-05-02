import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CoinChange from "./pages/CoinChange";
import ExerciseTwo from "./pages/ExerciseTwo";
import ExerciseThree from "./pages/ExerciseThree";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CoinChange} />
        <Route exact path="/exercisetwo" component={ExerciseTwo} />
        <Route exact path="/exercisethree" component={ExerciseThree} />
      </Switch>
    </BrowserRouter>
  );
}
