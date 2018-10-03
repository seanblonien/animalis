import React from 'react';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';
import OwnerRegister from 'js/OwnerRegister';
import SitterRegister from 'js/SitterRegister';
import {Link} from 'react-router-dom';

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
								validators={[Validation.requiredValidator, Validation.emailValidator]}
								field={<input className="form-control" type="email" />} />

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

	handleFieldChange(e) {
		// console.log('=====');
		// console.log(Object.values(e.target));
		// // console.log(Object.keys(e.target._valueTracker));
		// console.log(e.target.name);
		// console.log(this.props);
		// console.log('=====');
		// const field = e.target.name;
		// const value = e.target.value;
		//
		// this.setState(prevState => ({ validatedFields: prevState.validatedFields.set(field, value) }));
	}

	render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address" placeholder="JohnDoe@gmail.com"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator, Validation.emailValidator]}
								field={<input className="form-control" type="email" />} />

				<Bessemer.Field name="password" friendlyName="Password" placeholder="At least 6 characters"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" />} />

				<Bessemer.Field name="fname" friendlyName="First Name" placeholder="John"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="lname" friendlyName="Last Name" placeholder="Doe"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="phone" friendlyName="Phone Number" placeholder="987-654-3210"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator, Validation.phoneNumberValidator]} />

				<Bessemer.Field name="address" friendlyName="Street Address" placeholder="7342 Pumpkin Hill St."
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="city" friendlyName="City" placeholder="Duluth"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="state" friendlyName="State" placeholder="GA"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name="zip" friendlyName="ZIP" placeholder="30096"
								onChange={this.handleFieldChange}
								validators={[Validation.requiredValidator]} />

				<Bessemer.Field name={'petOwner'} friendlyName={'I am a pet owner.'}
								onChange={this.handleCheckboxChange}
								field={<input type="checkbox" value={this.state.checkedItems.get('petOwner')} />} />

				<Bessemer.Field name={'petSitter'} friendlyName={'I am a pet sitter.'}
								onChange={this.handleCheckboxChange}
								field={<input type="checkbox" value={this.state.checkedItems.get('petSitter')} />} />

				<Bessemer.Field name={'emailNotifications'} friendlyName={'Send me an email when I get a new message or request.'}
								onChange={this.handleCheckboxChange}
								field={<input type="checkbox" value={this.state.checkedItems.get('emailNotifications')} />} />

				{this.state.checkedItems.get('petOwner') ? <OwnerRegister /> : null}

				{this.state.checkedItems.get('petSitter') ? <SitterRegister /> : null}

				<Bessemer.Button loading={submitting}><Link to="/" style={{color: '#FFF'}}>Register</Link></Bessemer.Button>
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