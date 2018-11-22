import {makeToast, Toasts} from 'js/Common/Toasts';
import {waitToUpdateTime} from 'js/Pet/PetList';
import {getUserDetails} from 'js/User/Users';
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
import {confirmPassword, update} from 'js/User/Users';
import {Loading} from 'js/Common/Loading';
import {sexOptions} from 'js/Pet/AddPetForm';

export const stateOptions = [
    {label: 'Alabama', value: 'AL'},
    {label: 'Alaska', value: 'AK'},
    {label: 'Arizona', value: 'AZ'},
    {label: 'Arkansas', value: 'AR'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'Connecticut', value: 'CT'},
    {label: 'Delaware', value: 'DE'},
    {label: 'Florida', value: 'FL'},
    {label: 'Georgia', value: 'GA'},
    {label: 'Hawaii', value: 'HI'},
    {label: 'Idaho', value: 'ID'},
    {label: 'Illinois', value: 'IL'},
    {label: 'Indiana', value: 'IN'},
    {label: 'Iowa', value: 'IA'},
    {label: 'Kansas', value: 'KS'},
    {label: 'Kentucky', value: 'KY'},
    {label: 'Louisiana', value: 'LA'},
    {label: 'Maine', value: 'ME'},
    {label: 'Maryland', value: 'MD'},
    {label: 'Massachusetts', value: 'MA'},
    {label: 'Michigan', value: 'MI'},
    {label: 'Minnesota', value: 'MN'},
    {label: 'Mississippi', value: 'MS'},
    {label: 'Missouri', value: 'MO'},
    {label: 'Montana', value: 'MT'},
    {label: 'Nebraska', value: 'NE'},
    {label: 'Nevada', value: 'NV'},
    {label: 'New Hampshire', value: 'NH'},
    {label: 'New Jersey', value: 'NJ'},
    {label: 'New Mexico', value: 'NM'},
    {label: 'New York', value: 'NY'},
    {label: 'North Carolina', value: 'NC'},
    {label: 'North Dakota', value: 'ND'},
    {label: 'Ohio', value: 'OH'},
    {label: 'Oklahoma', value: 'OK'},
    {label: 'Oregon', value: 'OR'},
    {label: 'Pennsylvania', value: 'PA'},
    {label: 'Rhode Island', value: 'RI'},
    {label: 'South Carolina', value: 'SC'},
    {label: 'South Dakota', value: 'SD'},
    {label: 'Tennessee', value: 'TN'},
    {label: 'Texas', value: 'TX'},
    {label: 'Utah', value: 'UT'},
    {label: 'Vermont', value: 'VT'},
    {label: 'Virginia', value: 'VA'},
    {label: 'Washington', value: 'WA'},
    {label: 'West Virginia', value: 'WV'},
    {label: 'Wisconsin', value: 'WI'},
    {label: 'Wyoming', value: 'WY'}
];

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.displayChecks = this.displayChecks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateState = this.updateState.bind(this);

        this.state = {
            checkedItems: new Map(),
            hasLoaded: false,
            stateChoice: '',
        };

        if(_.isDefined(this.props.editProfile)) {
            this.props.refreshUser().then(() => {
                this.updateState();
            });
        } else {
            this.updateState(true);
        }
    }

    updateState(inConstructor) {
        this.state.hasLoaded = true;
        this.state.checkedItems.set('petOwner', this.props.user ? this.props.user.roles.includes('OWNER') : false);
        this.state.checkedItems.set('petSitter', this.props.user ? this.props.user.roles.includes('SITTER') : false);
        this.state.checkedItems.set('emailNotifications', this.props.user ? this.props.user.attributes.emailNotifications === 'true' : false);
        if(!inConstructor || _.isUndefined(inConstructor)) this.setState(this.state);
        this.displayChecks();
    }

    onSubmit = user => {
        if (user != null) {
            let userToUpdate = JSON.parse(JSON.stringify(user));

            userToUpdate.petSitter = this.state.checkedItems.get('petSitter');
            userToUpdate.petOwner = this.state.checkedItems.get('petOwner');
            userToUpdate.emailNotifications = this.state.checkedItems.get('emailNotifications');

            if(this.props.editProfile == null){
                if(userToUpdate.password !== userToUpdate.password2){
                    makeToast(Toasts.Unsuccessful.PasswordMatch);
                    return;
                }
                delete userToUpdate.password2;

                userToUpdate.pets = [];
                userToUpdate.sessions = [];
                userToUpdate.notifications = [];
                this.props.register(userToUpdate);
            } else {
                Users.confirmPassword(userToUpdate.passwordConfirm).then(res => {
                    if(res) {
                        userToUpdate.principal = this.props.user.principal;
                        userToUpdate.password = user.passwordConfirm;
                        delete userToUpdate.passwordConfirm;

                        if (userToUpdate.fname == null) userToUpdate.fname = this.props.user.attributes.fname;
                        if (userToUpdate.lname == null) userToUpdate.lname = this.props.user.attributes.lname;
                        if (userToUpdate.phone == null) userToUpdate.phone = this.props.user.attributes.phone;
                        if (userToUpdate.street == null) userToUpdate.street = this.props.user.address.street;
                        if (userToUpdate.city == null) userToUpdate.city = this.props.user.address.city;
                        if (userToUpdate.state == null) userToUpdate.state = this.props.user.address.state;
                        if (userToUpdate.zip == null) userToUpdate.zip = this.props.user.address.zip;
                        userToUpdate.pets = this.props.user.pets;
                        userToUpdate.sessions = this.props.user.sessions;
                        userToUpdate.notifications = this.props.user.notifications;

                        Users.updateUser(userToUpdate).then(() => {
                            user.fname = user.lname = user.phone = user.street = user.city = user.state = user.zip = user.passwordConfirm = null;
                        });

                        setTimeout(() => {
                            this.props.refreshUser().then(() => {
                                makeToast(Toasts.Successful.ProfileUpdate);
                                this.updateState();
                            });
                        }, waitToUpdateTime);
                    } else {
                        makeToast(Toasts.Unsuccessful.ConfirmPassword);
                    }
                });
            }
        }
    };

    handleCheckboxChange(e) {
        this.state.checkedItems.set(e, !this.state.checkedItems.get(e));
        this.setState(this.state);
        console.log(e + ' set to ' + this.state.checkedItems.get(e));
    }

    handleStateChoiceChange = e => {
        if (e != null) {
            this.state.stateChoice = e;
            this.setState(this.state);
        }
    };

    displayChecks() {
        console.log('User attribute checkbox values: \npetOwner-' +
            this.state.checkedItems.get('petOwner').toString() + ',\npetSitter-' +
            this.state.checkedItems.get('petSitter').toString() + ',\nemailNotif-' +
            this.state.checkedItems.get('emailNotifications').toString() + '\n\n');
    }

    render() {
        let {handleSubmit, submitting, editProfile} = this.props;

        if (this.props.editProfile == null && this.props.user) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                {this.state.hasLoaded ?
                    <div>
                        <form name='form' onSubmit={handleSubmit(form => this.onSubmit(form))}>
                            {_.isUndefined(this.props.editProfile) &&
                            <div>
                                <Bessemer.Field name='principal' friendlyName='Email Address'
                                                validators={[Validation.requiredValidator, Validation.emailValidator]}
                                                field={<input className='form-control' type='email' placeholder='JohnDoe@gmail.com'/>}/>

                                <Bessemer.Field name='password' friendlyName='Password'
                                                validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
                                                field={<input className='form-control' type='password' placeholder='At least 6 characters'/>}/>

                                <Bessemer.Field name='password2' friendlyName='Confirm Password'
                                                validators={[Validation.requiredValidator, Validation.passwordValidator, Validation.safeValidator]}
                                                field={<input className='form-control' type='password' placeholder='Confirm password'/>}/>
                            </div>
                            }

                            <Bessemer.Field name='fname' friendlyName='First Name'
                                            placeholder={this.props.editProfile == null ? 'John' : this.props.user.attributes.fname}
                                            validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : [Validation.safeValidator]}/>

                            <Bessemer.Field name='lname' friendlyName='Last Name'
                                            placeholder={this.props.editProfile == null ? 'Doe' : this.props.user.attributes.lname}
                                            validators={this.props.editProfile == null? [Validation.requiredValidator, Validation.safeValidator] : [Validation.safeValidator]}/>

                            <Bessemer.Field name='phone' friendlyName='Phone Number'
                                            placeholder={this.props.editProfile == null ? '987-654-3210' : this.props.user.attributes.phone}
                                            validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.phoneNumberValidator, Validation.safeValidator] : [Validation.phoneNumberValidator,Validation.safeValidator]}/>

                            <Bessemer.Field name='street' friendlyName='Street Address'
                                            placeholder={this.props.editProfile == null ? '7342 Pumpkin Hill St.' : this.props.user.address.street}
                                            validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : [Validation.safeValidator]}/>

                            <Bessemer.Field name='city' friendlyName='City'
                                            placeholder={this.props.editProfile == null ? 'Duluth' : this.props.user.address.city}
                                            validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : [Validation.safeValidator]}/>


                            <span className={'row'} style={{verticalAlign: 'middle', width: '100%', marginBottom: 15}}>
                                <label className={'col-4 d-inline-block'}>State*</label>
                                <Bessemer.Select name="state"
                                                 className={'col-8 d-inline-block'}
                                                 friendlyName="State"
                                                 placeholder="Texas"
                                                 validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : [Validation.safeValidator]}
                                                 options={stateOptions} value={this.state.stateChoice}
                                                 onChange={opt => this.handleStateChoiceChange(opt)}/>
                            </span>

                            <Bessemer.Field name='zip' friendlyName='ZIP'
                                            placeholder={this.props.editProfile == null ? '30096' : this.props.user.address.zip}
                                            validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator, Validation.zipValidator] : [Validation.safeValidator, Validation.zipValidator]}/>

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

                            <Bessemer.Field name={'emailNotifications'}
                                            onChange={(e) => this.handleCheckboxChange(e)}
                                            showLabel={false}
                                            field={<Checkbox label={'Send me an email when I get a new message or request.'}
                                                             handleCheckboxChange={this.handleCheckboxChange}
                                                             name={'emailNotifications'}
                                                             defaultCheck={this.state.checkedItems.get('emailNotifications')}/>}/>


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
                    </div>
                    :
                    <div>
                        <Loading/>
                    </div>
                }
            </div>
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
        updateUser: user => dispatch(Users.Actions.updateUser(user)),
    })
)(RegistrationForm);

export {RegistrationForm};
