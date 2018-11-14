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

				<div className="container">
					<div className="row">
						<div className="col align-self-start">
						</div>
                        <div className="col-8 align-self-end">
                            <Bessemer.Button loading={submitting} style={{backgroundColor: '#8C54A1', borderColor: '#8C54A1'}}>Login</Bessemer.Button>
                        </div>
					</div>
				</div>

                <div className="mt-2">
					<p style={{display: 'inline-block'}}>Don't have an account yet?</p>
                    <a className="btn btn-primary ml-1"
                       style={{backgroundColor: '#8C54A1', borderColor: '#8C54A1', display: 'inline-block'}}
                       href="/#/register">Sign up</a>
                </div>
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
