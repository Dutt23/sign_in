import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from 'redux/actions'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>Dashboard container</code>
        </p>
      </header>
    </div> 
  );
}

export default App;
