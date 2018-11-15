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
import {confirmPassword} from 'js/User/Users';
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

        if(this.props.user) this.props.refreshUser();

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.displayChecks = this.displayChecks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setCheckboxes = this.setCheckboxes.bind(this);

        this.state = {
            checkedItems: new Map(),
            hasLoaded: false,
            stateChoice: '',
        };

        setTimeout(() => {
            this.state.hasLoaded = true;
            this.setCheckboxes();
            this.forceUpdate();
        }, 1000);
    }

    setCheckboxes() {
        this.state.checkedItems.set('petOwner', this.props.user ? this.props.user.roles.includes('OWNER') : false);
        this.state.checkedItems.set('petSitter', this.props.user ? this.props.user.roles.includes('SITTER') : false);
        this.state.checkedItems.set('emailNotifications', this.props.user ? this.props.user.attributes.emailNotifications === 'true' : false);
        this.displayChecks();
    }

    onSubmit = user => {
        if (user != null) {
            user.petSitter = this.state.checkedItems.get('petSitter');
            user.petOwner = this.state.checkedItems.get('petOwner');
            user.emailNotifications = this.state.checkedItems.get('emailNotifications');
            this.displayChecks();

            if(this.props.editProfile == null){
                if(user.password !== user.password2){
                    console.error('Passwords do not match...');
                    return;
                }

                user.pets = [];
                user.sessions = [];
                this.props.register(user);
            } else {
                confirmPassword(user.passwordConfirm).then(res => {
                    if(res) {
                        this.state.hasLoaded = false;
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
                    }
                });
            }
        }
    };

    handleCheckboxChange(e) {
        let value = this.state.checkedItems;
        value.set(e, !this.state.checkedItems.get(e));
        this.setState({value});

        console.log(e + ' set to ' + this.state.checkedItems.get(e));
    }

    handleStateChoiceChange = e => {
        if (e != null) {
            this.state.stateChoice = e;
            this.forceUpdate();
        }
    };

    displayChecks() {
        console.log('User attribute checkbox values: \npetOwner-' +
            this.state.checkedItems.get('petOwner').toString() + ',\npetSitter-' +
            this.state.checkedItems.get('petSitter').toString() + ',\nemailNotif-' +
            this.state.checkedItems.get('emailNotifications').toString() + '\n\n');
    }

    render() {
        let {handleSubmit, submitting} = this.props;

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
                                                placeholder='JohnDoe@gmail.com'
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

                            {/*<Bessemer.Field name='state' friendlyName='State'*/}
                                            {/*placeholder={this.props.editProfile == null ? 'GA' : this.props.user.address.state}*/}
                                            {/*validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>*/}

                            <span className={'row'} style={{verticalAlign: 'middle', width: '100%', marginBottom: 15}}>
                                <label className={'col-4 d-inline-block'}>State*</label>
                                <Bessemer.Select name="state"
                                         className={'col-8 d-inline-block'}
                                         friendlyName="State" placeholder="Texas"
                                         validators={[Validation.requiredValidator, Validation.safeValidator]}
                                         options={stateOptions} value={this.state.stateChoice}
                                         onChange={opt => this.handleStateChoiceChange(opt)}/>
                            </span>

                            <Bessemer.Field name='zip' friendlyName='ZIP'
                                            placeholder={this.props.editProfile == null ? '30096' : this.props.user.address.zip}
                                            validators={this.props.editProfile == null ? [Validation.requiredValidator, Validation.safeValidator] : []}/>

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
