import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (

   <Fragment>
      <div className="container">
      </div>
      <div>
        Welcome
      </div>
      </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.is_authenticated
});

export default connect(mapStateToProps)(Landing);