import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import AddPet from 'js/AddPet';
import Cookies from 'universal-cookie';

/* Color Codes
    Dark Blue:   #01395E
    Teal:             #00999E
    Light Gray: #D5D5D5
    Orange:      #EE680F
*/

export class NavBar1 extends React.Component {
    onSubmit = () => {
        const cookies = new Cookies();
        return <Redirect to='/editprofile' />;
    };

    render() {
        return (
            <nav style={{backgroundColor: '#ff5500'}} className="navbar navbar-expand-md">
                <a className="navbar-brand" href="/#" style={{color:'white'}} >Tempeturs Web App </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation" style={{color:'white'}}>
                    <span className="navbar-toggler-icon" style={{color:'white'}}></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse" >
                    <ul style={{color:'white', float:'right'}} className="nav navbar-nav navbn ml-auto" >
                        <li className="nav-item ">
                            <a className="nav-link" href="/#" style={{color:'white'}} > Home <span className="sr-only">(current)</span></a>
                        </li>
                        {!_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/register" style={{color: 'white'}}> Register </a>
                            </li>
                        }
                        { !_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/login" style={{color:'white'}} > Login </a>
                            </li>
                        }
                        {_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/editprofile" style={{color: 'white'}}> Profile </a>
                            </li>
                        }
                        {_.isDefined(this.props.user) &&
                        <li className="nav-item">
                            <a className="nav-link" href="/#/schedulesession" style={{color: 'white'}}> Schedule </a>
                        </li>
                        }
                        {_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/rate" style={{color: 'white'}}> Rate </a>
                            </li>
                        }
                        {_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/testendpoint" style={{color: 'white'}}> Logout </a>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

NavBar1 = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(NavBar1);

export class Home extends React.Component {
	render() {
		return (
			<div>
				<NavBar1/>
				<div style={{float:'center',marginRight:'25%', marginLeft:'25%', marginTop:'25px',
                    borderRadius:'20px', backgroundColor:'#D5D5D5'}} >
					<h1 style={{float:'center',marginRight:'5%', marginLeft:'5%', marginTop:'5px'}} > Welcome to the Tempeturs Web App Home Page! </h1>
					<img style={{padding:'5%'}} src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000" height="225" width="430"/>
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