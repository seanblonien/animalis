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
import Checkbox from 'js/Common/Checkbox';

const checkBoxes = ['petOwner', 'petSitter', 'emailNotifications'];

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checkedItems: new Map(),
			update: false,
		};

		this.state.checkedItems.set('petOwner', this.props.user ? this.props.user.roles.includes('OWNER') : false);
		this.state.checkedItems.set('petSitter', this.props.user ? this.props.user.roles.includes('SITTER') : false);
		this.state.checkedItems.set('emailNotifications', this.props.user ? this.props.user.attributes.emailNotifications === 'true' : false);

		// if (this.props.user) {
		// 	this.state.checkedItems.set('petOwner', this.props.user.roles.includes('OWNER') );
		// 	this.state.checkedItems.set('petSitter', this.props.user.roles.includes('SITTER'));
		// 	this.state.checkedItems.set('emailNotifications', this.props.user.attributes.emailNotifications);
		// } else {
		// 	this.state.checkedItems.set('petOwner', false);
		// 	this.state.checkedItems.set('petSitter', false);
		// 	this.state.checkedItems.set('emailNotifications', false);
		// }
		this.displayChecks();


		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.displayChecks = this.displayChecks.bind(this);
	}

	onSubmit = user => {
		if (user != null) {
			user.petSitter = this.state.checkedItems.get('petSitter');
			user.petOwner = this.state.checkedItems.get('petOwner');
			user.emailNotifications = this.state.checkedItems.get('emailNotifications');
			this.displayChecks();

			if (this.props.editProfile == null) {
				user.pets = [];
				this.props.register(user);
			} else {
				user.principal = this.props.user.principal;
				user.password = user.passwordConfirm;

				if (user.fname == null) user.fname = this.props.user.attributes.fname;
				if (user.lname == null) user.lname = this.props.user.attributes.lname;
				if (user.phone == null) user.phone = this.props.user.attributes.phone;
				if (user.street == null) user.street = this.props.user.address.street;
				if (user.city == null) user.city = this.props.user.address.city;
				if (user.state == null) user.state = this.props.user.address.state;
				if (user.zip == null) user.zip = this.props.user.address.zip;

				this.props.updateUser(user);
                setTimeout(this.props.refreshUser, 1000);
			}
		}
	};

	handleCheckboxChange(e) {
		let value = this.state.checkedItems;
		value.set(e, !this.state.checkedItems.get(e));
		this.setState({value});

		console.log(e + ' set to ' + this.state.checkedItems.get(e));
	}

	displayChecks() {
		console.log('User attribute checkbox values: \npetOwner-' +
			this.state.checkedItems.get('petOwner').toString() + ',\npetSitter-' +
			this.state.checkedItems.get('petSitter').toString() + ',\nemailNotif-' +
			this.state.checkedItems.get('emailNotifications').toString() + '\n========================================');
	}

	render() {
		let {handleSubmit, submitting} = this.props;

		if (this.props.editProfile == null && this.props.user) {
			return <Redirect to='/'/>;
		}

		return (
			<form name='form' onSubmit={handleSubmit(form => this.onSubmit(form))}>
				{_.isUndefined(this.props.editProfile) &&
				<div>
					<Bessemer.Field name='principal' friendlyName='Email Address' placeholder='JohnDoe@gmail.com'
									validators={[Validation.requiredValidator, Validation.emailValidator]}
									field={<input className='form-control' type='email'/>}/>

					<Bessemer.Field name='password' friendlyName='Password' placeholder='At least 6 characters'
									validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
									field={<input className='form-control' type='password'/>}/>

					<Bessemer.Field name='password2' friendlyName='Confirm Password'
									validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
									field={<input className='form-control' type='password'/>}/>
				</div>
				}

				<Bessemer.Field name='fname' friendlyName='First Name'
								placeholder={this.props.editProfile == null ? 'John' : this.props.user.attributes.fname}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

				<Bessemer.Field name='lname' friendlyName='Last Name'
								placeholder={this.props.editProfile == null ? 'Doe' : this.props.user.attributes.lname}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

				<Bessemer.Field name='phone' friendlyName='Phone Number'
								placeholder={this.props.editProfile == null ? '987-654-3210' : this.props.user.attributes.phone}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.phoneNumberValidator, Validation.safeValidator] : []}/>

				<Bessemer.Field name='street' friendlyName='Street Address'
								placeholder={this.props.editProfile == null ? '7342 Pumpkin Hill St.' : this.props.user.address.street}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

				<Bessemer.Field name='city' friendlyName='City'
								placeholder={this.props.editProfile == null ? 'Duluth' : this.props.user.address.city}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

				<Bessemer.Field name='state' friendlyName='State'
								placeholder={this.props.editProfile == null ? 'GA' : this.props.user.address.state}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

				<Bessemer.Field name='zip' friendlyName='ZIP'
								placeholder={this.props.editProfile == null ? '30096' : this.props.user.address.zip}
								validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

				{/*<Bessemer.Field name={'petOwner'} friendlyName={'I am a pet owner.'}*/}
								{/*onChange={(e) => this.handleCheckboxChange(e)}*/}
								{/*field={<input type='checkbox' checked={!!this.state.checkedItems.get('petOwner')}/>}/>*/}

				{/*<Bessemer.Field name={'petSitter'} friendlyName={'I am a pet sitter.'}*/}
								{/*onChange={(e) => this.handleCheckboxChange(e)}*/}
								{/*field={<input type='checkbox' checked={!!this.state.checkedItems.get('petSitter')}/>}/>*/}

				<Bessemer.Field name={'petOwner'}
								onChange={(e) => this.handleCheckboxChange(e)}
								showLabel={false}
								field={<Checkbox label={'I am a pet owner.'}
												 handleCheckboxChange={this.handleCheckboxChange}
												 name={'petOwner'}
												 defaultCheck={this.state.checkedItems.get('petOwner')}/>}/>

				<Bessemer.Field name={'petSitter'}
								onChange={(e) => this.handleCheckboxChange(e)}
								showLabel={false}
								field={<Checkbox label={'I am a pet sitter.'}
												 handleCheckboxChange={this.handleCheckboxChange}
												 name={'petSitter'}
												 defaultCheck={this.state.checkedItems.get('petSitter')}/>}/>

				{/*<Bessemer.Field name={'emailNotifications'}
								friendlyName={'Send me an email when I get a new message or request.'}
								onChange={this.handleCheckboxChange}
								field={<input type='checkbox'
											  checked={!!this.state.checkedItems.get('emailNotifications')}/>}/>*/}
				{/*{this.state.checkedItems.get('emailNotifications') &&*/}
					{/*<Bessemer.Field name={'emailNotifications'}*/}
									{/*friendlyName={'Send me an email when I get a new message or request.'}*/}
									{/*onChange={(e) => this.handleCheckboxChange(e)}*/}
									{/*field={<input type='checkbox' checked={true}/>}/>*/}
				{/*}*/}

				{/*{!this.state.checkedItems.get('emailNotifications') &&*/}
				{/*<Bessemer.Field name={'emailNotifications'}*/}
								{/*friendlyName={'Send me an email when I get a new message or request.'}*/}
								{/*onChange={(e) => this.handleCheckboxChange(e)}*/}
								{/*field={<input type='checkbox'/>}/>*/}
				{/*}*/}

				{/*<Bessemer.Field name={'emailNotifications'}*/}
								{/*onChange={this.handleCheckboxChange}*/}
								{/*field={<Checkbox label={'Send me an email when I get a new message or request.'} handleCheckboxChange={this.handleCheckboxChange} defaultCheck={true}/>}/>*/}

				<Bessemer.Field name={'emailNotifications'}
								//onChange={(e) => this.handleCheckboxChange(e)}
								showLabel={false}
								field={<Checkbox label={'Send me an email when I get a new message or request.'}
												 handleCheckboxChange={this.handleCheckboxChange}
												 name={'emailNotifications'}
												 defaultCheck={this.state.checkedItems.get('emailNotifications')}/>}/>

				{/*<button className={'btn'} onClick={this.displayChecks}>CLICK ME</button>*/}

				{_.isUndefined(this.props.editProfile) &&
				<div>
					{this.state.checkedItems.get('petOwner') ? <OwnerRegister/> : null}

					{this.state.checkedItems.get('petSitter') ? <SitterRegister/> : null}
				</div>
				}

				{_.isDefined(this.props.editProfile) &&
				<div>
					<p>Enter in your password to update your profile.</p>
					<Bessemer.Field name='passwordConfirm' friendlyName='Enter Password to Edit'
									validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
									field={<input className='form-control' type='password'/>}/>
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
		refreshUser: () => dispatch(Users.Actions.refreshUser()),
		updateUser: user => dispatch(Users.Actions.update(user)),
	})
)(RegistrationForm);

export {RegistrationForm};