import _ from 'lodash';

import React from 'react';
import {connect} from 'react-redux';
import * as Users from 'js/User/Users';
import * as Login from 'js/LoginRegister/LoginForm';
import AddPetForm from 'js/Pet/AddPetForm';
import ScheduleSession from 'js/Sesssion/ScheduleSession';
import HomePage from 'js/Common/HomePage';
import {DeleteAccount} from 'js/User/DeleteAccount';
import {RegistrationForm} from 'js/LoginRegister/RegisterForm';
import Redirect from 'react-router-dom/es/Redirect';
import PetList from 'js/Pet/PetList';
import {NavBar} from 'js/Common/NavBar';
import SessionPostings from 'js/Sesssion/SessionPostings';
import MySessions from 'js/Sesssion/MySessions';
import SessionHistory from 'js/Sesssion/SessionHistory';
import SessionTypes from 'js/Sesssion/SessionTypes';
import Notifications from 'js/User/Notifications';

/* Color Codes
    Dark Blue:   #01395E
    Teal:             #00999E
    Light Gray: #D5D5D5
    Orange:      #EE680F
*/

export class Home extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>

                <HomePage/>
            </div>
        );
    }
}

export class RegisterPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <h2>Register</h2>
                            <hr/>
                            <RegistrationForm/>
                            <hr/>

                            {_.isDefined(this.props.user) &&
                            <div> You are registered, {this.props.user.principal}!</div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <h2>Login</h2>
                            <hr/>
                            <Login.LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ProfilePage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3">

                            <h2>My Profile</h2>

                            <h3>Update My Account Information</h3>
                            <RegistrationForm editProfile="true"/>
                            <hr/>

                            {_.isDefined(this.props.user) && (this.props.user.roles.includes('OWNER')) &&
                            <div>
                                <h3>Add a Pet</h3>
                                <AddPetForm/>
                                <hr/>
                            </div>
                            }

                            {_.isDefined(this.props.user) && (this.props.user.roles.includes('SITTER')) &&
                            <div>
                                <h3>Sitter Preferences</h3>
                                <p>Any sitter specific settings here.</p>
                                <hr/>
                            </div>
                            }


                            <h3>Delete My Account</h3>
                            <DeleteAccount/>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfilePage = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(ProfilePage);

export {ProfilePage};

export class SessionPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="container padded">
                    <h2>Schedule A Session</h2>
                    <hr/>
                    <div className="row">
                        <div className="col-4">
                            <SessionTypes/>
                        </div>
                        <div className="col-6">
                            <ScheduleSession/>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        );
    }
}

export class PostingPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3">

                            <h2>Job Postings</h2>

                            <SessionPostings/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class MySessionsPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>

                <div className="container padded align-content-center">
                    <h2>My Sessions</h2>
                    <MySessions/>
                </div>
            </div>
        );
    }
}

export class HistoryPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>

                <div className="container padded align-content-center">
                    <h2>Session History</h2>
                    <SessionHistory/>
                </div>
            </div>
        );
    }
}

export class NotificationsPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>

                <div className="container padded align-content-center">
                    <h2>Notifications</h2>
                    <Notifications/>
                </div>
            </div>
        );
    }
}
