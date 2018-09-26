import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';
import CheckboxContainer from 'js/CheckboxContainer';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

	}

	onSubmit = ({principal, password}) => {
		return this.props.authenticate(principal, password);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
				                validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]} />

				<Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
			</form>
		);
	}
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
	state => ({

	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginForm);

export { LoginForm };

class RegistrationForm extends React.Component {
	onSubmit = user => {
		return this.props.register(user);
	};

    render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
				                validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]}
				                field={<input className="form-control" type="password" />} />

                <Bessemer.Field name="fname" friendlyName="First Name"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="lname" friendlyName="Last Name"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="phone" friendlyName="Phone Number"
                                validators={[Validation.requiredValidator, Validation.phoneNumberValidator]} />

                <Bessemer.Field name="address" friendlyName="Street Address"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="city" friendlyName="City"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="state" friendlyName="State"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="zip" friendlyName="ZIP"
                                validators={[Validation.requiredValidator]} />

				<CheckboxContainer/>

				<Bessemer.Button loading={submitting}>Register</Bessemer.Button>
			</form>
		);
	}
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
	state => ({

	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegistrationForm);

export { RegistrationForm };