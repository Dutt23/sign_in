import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import actions from 'redux/actions'

const Navbar = ({ isAuthenticated }) => {
const dispatch = useDispatch()
const logOut = () => dispatch(actions.logOut())
  const nonAuthLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
                  </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Registration
          </Link>
      </li>
    </ul>
  )

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <div onClick = {logOut} to="/login" className="nav-link">
          Logout
          </div>
      </li>
    </ul>
  );


  return (

    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Dashboard
          </Link>
      </div>
      <Fragment>{isAuthenticated ? authLinks : nonAuthLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.is_authenticated
});

export default connect(mapStateToProps)(Navbar);