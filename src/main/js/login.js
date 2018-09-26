import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';
import Checkbox from 'js/Checkbox';

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

        this.checkBoxState = {
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

				<hr/>
				{
                    checkboxes.map(item => (
                        <div>
                            <Checkbox name={item.name} checked={this.checkBoxState.checkedItems.get(item.name)} onChange={this.handleCheckboxChange} />  <label key={item.key}> {item.label} </label>
                        </div>
                    ))
				}

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