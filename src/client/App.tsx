import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export const App: React.FunctionComponent = () => {
  return (
    <React.Suspense fallback={() => <span>loading...</span>}>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>App</h1>
          </Route>
        </Switch>
      </Router>
    </React.Suspense>
  );
};

App.displayName = "App";
