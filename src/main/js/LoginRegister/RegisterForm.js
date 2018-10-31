import React from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import OwnerRegister from 'js/LoginRegister/OwnerRegister';
import SitterRegister from 'js/LoginRegister/SitterRegister';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';

const checkBoxes = ['petOwner', 'petSitter', 'emailNotifications'];

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checkedItems: new Map(),
		};

		if(this.props.user){
			this.state.checkedItems.set('petOwner', this.props.user.attributes.petOwner);
			this.state.checkedItems.set('petSitter', this.props.user.attributes.petSitter);
			this.state.checkedItems.set('emailNotifications', this.props.user.attributes.emailNotifications);
			console.log('User attribute checkbox values: ' +
				this.state.checkedItems.get('petOwner') + ', ' +
				this.state.checkedItems.get('petSitter') + ', ' +
				this.state.checkedItems.get('emailNotifications'));
		}

		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	onSubmit = user => {

		if(user != null) {
			if(this.props.editProfile == null) {
				user.pets = [];
				return this.props.register(user);
			} else {
				user.principal = this.props.user.principal;
				user.password = user.passwordConfirm;

				if(user.fname == null) user.fname = this.props.user.attributes.fname;
				if(user.lname == null) user.lname = this.props.user.attributes.lname;
				if(user.phone == null) user.phone = this.props.user.attributes.phone;
				if(user.street == null) user.street = this.props.user.address.street;
				if(user.city == null) user.city = this.props.user.address.city;
				if(user.state == null) user.state = this.props.user.address.state;
				if(user.zip == null) user.zip = this.props.user.address.zip;
				if(user.petSitter == null) user.petSitter = this.props.user.attributes.petSitter;
				if(user.petOwner == null) user.petOwner = this.props.user.attributes.petOwner;
				if(user.emailNotifications == null) user.emailNotifications = this.props.user.attributes.emailNotifications;

				return this.props.update(user);
			}
		}
	};

	handleCheckboxChange(e) {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
	}

	render() {
		let { handleSubmit, submitting } = this.props;

		if(this.props.editProfile == null && this.props.user){
			return <Redirect to='/' />;
		}

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				{_.isUndefined(this.props.editProfile) &&
				<div>
					<Bessemer.Field name="principal" friendlyName="Email Address" placeholder="JohnDoe@gmail.com"
									validators={[Validation.requiredValidator, Validation.emailValidator]}
									field={<input className="form-control" type="email" />} />

					<Bessemer.Field name="password" friendlyName="Password" placeholder="At least 6 characters"
									validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
									field={<input className="form-control" type="password" />} />

					<Bessemer.Field name="password2" friendlyName="Confirm Password"
									validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
									field={<input className="form-control" type="password" />} />
				</div>
				}

				<Bessemer.Field name="fname" friendlyName="First Name" placeholder={this.props.editProfile == null ? 'John' : this.props.user.attributes.fname}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name="lname" friendlyName="Last Name" placeholder={this.props.editProfile == null ? 'Doe' : this.props.user.attributes.lname}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name="phone" friendlyName="Phone Number" placeholder={this.props.editProfile == null ? '987-654-3210' : this.props.user.attributes.phone}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.phoneNumberValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name="street" friendlyName="Street Address" placeholder={this.props.editProfile == null ? '7342 Pumpkin Hill St.' : this.props.user.address.street}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name="city" friendlyName="City" placeholder={this.props.editProfile == null ? 'Duluth' : this.props.user.address.city}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name="state" friendlyName="State" placeholder={this.props.editProfile == null ? 'GA' : this.props.user.address.state}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name="zip" friendlyName="ZIP" placeholder={this.props.editProfile == null ? '30096' : this.props.user.address.zip}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []} />

				<Bessemer.Field name={'petOwner'} friendlyName={'I am a pet owner.'}
								onChange={this.handleCheckboxChange}
								field={<input type="checkbox" value={this.state.checkedItems.get('petOwner')} />} />

				<Bessemer.Field name={'petSitter'} friendlyName={'I am a pet sitter.'}
								onChange={this.handleCheckboxChange}
								field={<input type="checkbox" value={this.state.checkedItems.get('petSitter')} />} />

				<Bessemer.Field name={'emailNotifications'} friendlyName={'Send me an email when I get a new message or request.'}
								onChange={this.handleCheckboxChange}
								field={<input type="checkbox" value={this.state.checkedItems.get('emailNotifications')} />} />

				{_.isUndefined(this.props.editProfile) &&
				<div>
					{this.state.checkedItems.get('petOwner') ? <OwnerRegister /> : null}

					{this.state.checkedItems.get('petSitter') ? <SitterRegister /> : null}
				</div>
				}

				{_.isDefined(this.props.editProfile) &&
				<div>
					<p>Enter in your password to update your profile.</p>
					<Bessemer.Field name="passwordConfirm"  friendlyName="Enter Password to Edit"
									validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
									field={<input className="form-control" type="password" />} />
					<Bessemer.Button loading={submitting}>Update Information</Bessemer.Button>
				</div>

				}
				{_.isUndefined(this.props.editProfile) &&
				<Bessemer.Button loading={submitting}>Register</Bessemer.Button>
				}
			</form>
		);
	}
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
	state => ({
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user)),
		update: user => dispatch(Users.Actions.update(user)),
	})
)(RegistrationForm);

export { RegistrationForm };