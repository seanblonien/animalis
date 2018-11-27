import PetList from 'js/Pet/PetList';
import MyRatings from 'js/User/MyRatings';
import {PublicProfile} from 'js/User/PublicProfile';
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
import SessionPostings from 'js/Sesssion/SessionPostings';
import MySessions from 'js/Sesssion/MySessions';
import MySessionHistory from 'js/Sesssion/MySessionHistory';
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
                <HomePage/>
            </div>
        );
    }
}

export class RegisterPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Register<hr/></h2>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-md-3">
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
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Login<hr/></h2>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <Login.LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class PublicProfilePage extends  React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container padded">
                <div className="row">
                    <PublicProfile match={this.props.match}/>
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
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Profile<hr/></h2>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <h3>View Profile</h3>
                            <a className="btn btn-primary" href={'#/profile/' + this.props.user.principal}>View your public profile</a>
                            <br/>
                            <hr/>
                            <h3>Delete My Account</h3>
                            <DeleteAccount/>
                        </div>
                        <div className="col-6">

                            <h3>Update Profile Information</h3>
                            <RegistrationForm editProfile="true"/>
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
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Schedule A Session<hr/></h2>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <SessionTypes/>
                        </div>
                        <div className="col-6">
                            <ScheduleSession/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class PostingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Session Postings<hr/></h2>
                    </div>
                    <SessionPostings/>
                </div>
            </div>
        );
    }
}

export class MySessionsPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Sessions<hr/></h2>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <MySessions/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class MyPetsPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Pets<hr/></h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <h4>Add Pet</h4>
                            <AddPetForm/>
                        </div>
                        <div className="col-md-8">
                            <h4>Pet List</h4>
                            <PetList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class MyRatingsPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Ratings<hr/></h2>
                    </div>
                    <MyRatings/>
                </div>
            </div>
        );
    }
}

export class MyHistoryPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Session History<hr/></h2>
                    </div>
                    <MySessionHistory/>
                </div>
            </div>
        );
    }
}

export class NotificationsPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Notifications</h2>
                    </div>
                    <Notifications/>
                </div>
            </div>
        );
    }
}
