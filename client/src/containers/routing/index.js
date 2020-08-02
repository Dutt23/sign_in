import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'containers/login-container'
const Routes = props => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
  );
};

export default Routes;