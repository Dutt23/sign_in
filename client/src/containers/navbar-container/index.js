import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated }) => {

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
        <Link to="/login" className="nav-link">
          Logout
                  </Link>
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