import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'containers/login-container'
import Signup from 'containers/signup-container'
import Alert from 'containers/alert-container'
const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
      </Switch>
    </section>
  );
};

export default Routes;