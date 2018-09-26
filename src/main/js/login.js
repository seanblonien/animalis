import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';
import Checkbox from 'js/Checkbox';
import {Link} from "react-router-dom";

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
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input className="form-control" type="password" />} />

                <Bessemer.Button loading={submitting}><Link to="/" style={{color: '#FFF'}}>Sign In</Link></Bessemer.Button>
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

const checkboxes = [
	{
		name: 'pet-owner',
		key: 'pet-owner-box',
		label: 'I am a pet owner.',
	},
	{
		name: 'pet-sitter',
		key: 'pet-sitter-box',
		label: 'I am a pet sitter.',
	},
	{
		name: 'email-notification',
		key: 'email-notification-box',
		label: 'Send me an email when I get a new message or request.',
	},
];

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checkedItems: new Map(),
		};

		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	onSubmit = user => {
		return this.props.register(user);
	};

	handleCheckboxChange(e) {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
	}

	render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
								validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" />} />

				<Bessemer.Field name="fname" friendlyName="First Name" placeholder="John"
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="lname" friendlyName="Last Name" placeholder="Doe"
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="phone" friendlyName="Phone Number" placeholder="987-654-3210"
								validators={[Validation.requiredValidator, Validation.phoneNumberValidator]} />

				<Bessemer.Field name="address" friendlyName="Street Address" placeholder="7342 Pumpkin Hill St."
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="city" friendlyName="City" placeholder="Duluth"
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="state" friendlyName="State" placeholder="GA"
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="zip" friendlyName="ZIP" placeholder="30096"
								validators={[Validation.requiredValidator]} />

				<hr/>
                <React.Fragment>
					{
						checkboxes.map(item => (
							<div>
								<Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleCheckboxChange} />  <label key={item.key}> {item.label} </label>
							</div>
						))
					}
				</React.Fragment>

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