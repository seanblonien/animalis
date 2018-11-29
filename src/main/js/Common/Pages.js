import PetList from 'js/Pet/PetList';
import MyRatings from 'js/User/MyRatings';
import { PublicProfile } from 'js/User/PublicProfile';
import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';
import * as Users from 'js/User/Users';
import * as Login from 'js/LoginRegister/LoginForm';
import AddPetForm from 'js/Pet/AddPetForm';
import ScheduleSession from 'js/Session/ScheduleSession';
import HomePage from 'js/Common/HomePage';
import { DeleteAccount } from 'js/User/DeleteAccount';
import { RegistrationForm } from 'js/LoginRegister/RegisterForm';
import Redirect from 'react-router-dom/es/Redirect';
import SessionPostings from 'js/Session/SessionPostings';
import MySessions from 'js/Session/MySessions';
import MyHistory from 'js/Session/MyHistory';
import SessionTypes from 'js/Session/SessionTypes';
import Notifications from 'js/User/Notifications';
import FaqPage from 'js/Common/FaqPage';
import AboutPageFooter from 'js/Common/AboutPageFooter';

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
                        <h2 className="col">Register
                            <hr/>
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <RegistrationForm/>

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
                        <h2 className="col">Login
                            <hr/>
                        </h2>
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

export class PublicProfilePage extends React.Component {
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

export class ProfilePage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Profile
                            <hr/>
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <h3>View Profile</h3>
                            <a className="btn btn-primary" href={'#/profile/' + this.props.user.principal}>View your
                                public profile</a>
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

export class SessionPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Schedule A Session
                            <hr/>
                        </h2>
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

SessionPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(SessionPage);

export class PostingPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Session Postings
                            <hr/>
                        </h2>
                    </div>
                    <SessionPostings/>
                </div>
            </div>
        );
    }
}

PostingPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(PostingPage);

export class MySessionsPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Sessions
                            <hr/>
                        </h2>
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

MySessionsPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(MySessionsPage);

export class MyPetsPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Pets
                            <hr/>
                        </h2>
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

MyPetsPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(MyPetsPage);

export class MyRatingsPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My Ratings
                            <hr/>
                        </h2>
                    </div>
                    <MyRatings/>
                </div>
            </div>
        );
    }
}

MyRatingsPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(MyRatingsPage);

export class MyHistoryPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">My History
                            <hr/>
                        </h2>
                    </div>
                    <MyHistory/>
                </div>
            </div>
        );
    }
}

MyHistoryPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(MyHistoryPage);

export class NotificationsPage extends React.Component {
    render() {
        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

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

NotificationsPage = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(NotificationsPage);

export class AboutPage extends React.Component {
    // TODO: Fill in information about this project
    // TODO: Describe our client Tempeturs and the role the mentors play
    //
    // TODO: Introduce the team (who we are, a picture of each of us, give links to our websites/LinkedIn

    render() {
        return (
            <div>
                <div className="container padded">
					<div className="row horizontal-center">
						<h2 className="col">About</h2>
					</div>
					<div>
						<AboutPageFooter/>
					</div>
				</div>
            </div>
        );
    }
}

export class SupportFAQPage extends React.Component {
    // TODO: Think of frequently asked questions regarding use of our website
    // TODO: Answer the frequently asked questions in paragraph form, step by step guide, or screenshots

    render() {
        return (
            <div>
                <div className="container padded">
                    <div className="row horizontal-center">
                        <h2 className="col">Frequently Asked Questions</h2>
                    </div>
                    <div>
                        <FaqPage/>
                    </div>
                </div>
            </div>
        );
    }
}
