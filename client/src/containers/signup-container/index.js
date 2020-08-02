import React, { Fragment, useState } from 'react';
import { isEmpty } from 'lodash'
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import actions from 'redux/actions'

const Signup = ({ isAuthenticated }) => {

	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});

	const { email, password, name, confirmPassword } = formData;

	const dispatchAlert = (message, type) => dispatch(actions.setAlert(message, type))

	const signUp = () =>{
		const user = {
			name,
			email,
			password,
			confirm_password: confirmPassword
		}
		dispatch(actions.signUp(user))
	}

	const emailValidation = () => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (isEmpty(email)) {
			dispatchAlert('Email cannot be empty', 'danger')
			return false;
		}
		if (!re.test(String(email).toLowerCase())) {
			dispatchAlert('Please enter a valid email', 'danger')
			return false;
		}
		return true
	}

	const nameValdiation = () => {
		if (isEmpty(name)) {
			dispatchAlert('Name cannot be empty', 'danger')
			return false;
		}
		return true;
	}

	const passwordValidation = () => {
		if (isEmpty(password) || isEmpty(confirmPassword)) {
			dispatchAlert('Please fill both the password fields', 'danger')
			return false
		}
		if (password.length < 6) {
			dispatchAlert('Password should be minimum 6 letters long', 'danger')
			return false;
		}
		if (password !== confirmPassword) {
			dispatchAlert('Passwords do not match', 'danger')
			return false
		}
		return true;
	}

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (emailValidation() && nameValdiation() && passwordValidation()) {
			// dispatchAlert('Passed all cases', 'success')
			signUp()
		}
		// Signup(email, password);
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
								<i className="fas fa-lock" /> Sign up
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
								<label htmlFor="text">Name</label>
								<input
									type="text"
									className="form-control"
									name="name"
									required
									value={name}
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
							<div className="form-group">
								<label htmlFor="text">Confirm password</label>
								<input
									type="text"
									className="form-control"
									name="confirmPassword"
									required
									value={confirmPassword}
									onChange={onChange}
								/>
							</div>
							<input
								type="submit"
								value="Sign up"
								className="btn btn-block btn-primary"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

Signup.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.is_authenticated
});

export default connect(mapStateToProps)(Signup);