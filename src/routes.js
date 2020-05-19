import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CoinChange from "./pages/CoinChange";
import CountSubsets from "./pages/CountSubsets";
import HigherSumSubsequence from "./pages/HigherSumSubsequence";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CoinChange} />
        <Route exact path="/countsubsets" component={CountSubsets} />
        <Route
          exact
          path="/highersumsubsequence"
          component={HigherSumSubsequence}
        />
      </Switch>
    </BrowserRouter>
  );
}
