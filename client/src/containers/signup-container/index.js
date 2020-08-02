import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect,  useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const Signup = ({ isAuthenticated }) => {

	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});

	const { email, password, name, confirmPassword } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
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
									name="name"
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