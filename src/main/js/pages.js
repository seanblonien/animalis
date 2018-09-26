import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';

export class Home extends React.Component {
	render() {
		return (
			<div className="container padded">
				<h1> Welcome to the Tempeturs Web App Home Page! </h1>

                <img src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000" height="225" width="430"/>

                <div>
					<div>
						<Bessemer.Button><Link to="/register" style={{color: '#FFF'}}>Register Now!</Link></Bessemer.Button>
					</div>
					<div>
						<h6>OR</h6>
					</div>
					<div>
						<Bessemer.Button><Link to="/login" style={{color: '#FFF'}}>Login</Link></Bessemer.Button>
					</div>
				</div>

				<ul>
					<li><Link to="/editprofile">Edit Profile</Link></li>
					<li><Link to="/schedulesession">Schedule Session</Link></li>
					<li><Link to="/rate">Rate</Link></li>
                    <li><Link to="/testendpoint">Test</Link></li>
				</ul>


			</div>
		);
	}
}

export class RegisterPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Register</h2>
						<hr />
						<Login.RegistrationForm />
						<hr />

                        { _.isDefined(this.props.user) &&
                        <div> You are registered, {this.props.user.principal}!</div>
                        }

					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Login</h2>
						<hr />
						<Login.LoginForm />
					</div>
				</div>
			</div>
		);
	}
}

class EditProfile extends React.Component {
	render() {
		return (
			<div className="container padded">
				<p>Edit your profile here.</p>

				{ _.isDefined(this.props.authentication) &&
				<div>{this.props.authentication['access_token']}</div>
				}

				{ _.isDefined(this.props.user) &&
				<div>Welcome, {this.props.user.principal}!</div>
				}
			</div>
		);
	}
}



EditProfile = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(EditProfile);

export { EditProfile };

export class ScheduleSession extends React.Component {
	render() {
		return (
			<div className="container padded">
				Schedule your session here.
			</div>
		);
	}
}

export class Rate extends React.Component {
	render() {
		return (
			<div className="container padded">
				Rate your sitters here.
			</div>
		);
	}
}

export class TestEndpoint extends React.Component {
    render() {
        return (
            <div className="container padded">
                Testing an endpoint.
            </div>
        );
    }
}