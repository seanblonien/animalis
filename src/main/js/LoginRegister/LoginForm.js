import React from 'react';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/User/Users';
import Redirect from 'react-router-dom/es/Redirect';

class LoginForm extends React.Component {
	onSubmit = ({principal, password}) => {
		return this.props.authenticate(principal, password);
	};

	constructor(props) {
		super(props);
	}

	render() {
		let {handleSubmit, submitting} = this.props;

		if (this.props.user) {
			return <Redirect to='/'/>;
		}

		return (
			<form name="form" action={'/'} onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
								validators={[Validation.requiredValidator, Validation.emailValidator]}
								field={<input className="form-control" type="email" autoComplete="username"/>}/>

				<Bessemer.Field name="password" friendlyName="Password"
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" autoComplete={'current-password'}/>}/>

				<Bessemer.Button loading={submitting}> Log In </Bessemer.Button>
			</form>
		);
	}
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginForm);

export {LoginForm};