import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, Provider } from 'react-redux'
import { store } from './store';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'containers/navbar-container';
import Landing from 'containers/landing-container'
import Routes from 'containers/routing'
import actions from 'redux/actions'


function App() {


  useEffect(() => {
    store.dispatch(actions.loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
