import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

export default function App() {
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
}

App.propTypes = {
  match: PropTypes.object,
};
