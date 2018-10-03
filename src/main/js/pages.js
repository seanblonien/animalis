import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import AddPet from 'js/AddPet';

export class NavBar1 extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/#">Tempeturs Web App </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="nav navbar-nav navbn" >
                        <li className="nav-item ">
                            <a className="nav-link" href="/#"> Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/register"> Register </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/login"> Login </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/editprofile"> Profile </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/schedulesession"> Schedule </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/rate"> Rate </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/testendpoint"> test</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export class Home extends React.Component {
	render() {
		return (
			<div>
				<NavBar1/>
				<div style={{float:'center',paddingRight:'25%', paddingLeft:'25%'}} >
					<h1 > Welcome to the Tempeturs Web App Home Page! </h1>
					<img style={{float:'center'}} src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000" height="225" width="430"/>
				</div>
			</div>
		);
	}
}

export class RegisterPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar1/>
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
            </div>
        );
    }
}

export class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar1/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <h2>Login</h2>
                            <hr />
                            <Login.LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditProfile extends React.Component {
    render() {
        return (
            <div>
                <NavBar1/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <h2>Edit your profile</h2>

                            <h4>Enter pet information:</h4>

                            <AddPet/>


                            { _.isDefined(this.props.authentication) &&
                            <div>{this.props.authentication['access_token']}</div>
                            }

                            { _.isDefined(this.props.user) &&
                            <div>Welcome, {this.props.user.principal}!</div>
                            }
                        </div>
                    </div>
                </div>
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
            <div>
                <NavBar1/>
                <div className="container padded">
                    Schedule your session here.
                </div>
            </div>
        );
    }
}

export class Rate extends React.Component {
    render() {
        return (
            <div>
                <NavBar1/>
                <div className="container padded">
                    Rate your sitters here.
                </div>
            </div>
        );
    }
}

export class TestEndpoint extends React.Component {
    render() {
        return (
            <div>
                <NavBar1/>
                <div className="container padded">
                    Testing an endpoint.
                </div>
            </div>
        );
    }
}