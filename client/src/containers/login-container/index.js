import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from 'redux/actions'
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash'

const Login = ({ isAuthenticated }) => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatchAlert = (message, type) => dispatch(actions.setAlert(message, type))

  const onSubmit = e => {
    e.preventDefault();
    if (!isEmpty(email) && !isEmpty(password)) {
      dispatch(actions.loginRequest({
        email,
        password
      }))
    }
    else {
      dispatchAlert(`${isEmpty(email) ? 'Email' : 'Password'} can't be blank`, 'danger')
    }
    // login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            {/* {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null} */}
            {/* paddong bottom 4 , padding top 3 */}

            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas fa-lock" /> Login
                </span>
            </h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  required
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={password}
                  onChange={onChange}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-block btn-primary"
              />
            </form>
            <p className="my-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.is_authenticated
});

export default connect(mapStateToProps)(Login);