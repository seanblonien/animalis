import React from 'react';
import _ from 'lodash';
import Favicon from 'react-favicon';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		document.title = 'Animalis';
	}

	logoutClick = () => {
		return this.props.logout();
	};

	render() {
		return (
			<div>
                <Favicon url="https://i.imgur.com/J9wBmWu.png" />
                <nav style={{backgroundColor: '#000000'}} className="navbar navbar-expand-md">
                    <a className="navbar-brand" href="/#" style={{color: 'white'}}>
                        <img style={{margin: -5}} src="https://i.imgur.com/5YjGzlp.png"
                             height="51" width="123	"/>
					</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation" style={{color: 'white'}}>
                        <span className="navbar-toggler-icon" style={{color: 'white'}}></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul style={{color: 'white', float: 'right'}} className="navbar-nav ml-auto">
                            {_.isDefined(this.props.user) &&
                            <li style={{borderRight: '1.5px solid white'}}>
                                <a className="nav-link"
                                   style={{color: 'white'}}> Hi, {this.props.user.attributes.fname} </a>
                            </li>
                            }
                            <li className="nav-item ">
                                <a className="nav-link" href="/#" style={{color: 'white'}}>Home</a>
                            </li>

                            <li className="nav-item dropdown" style={{color: 'white'}}>
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'white'}}>
                                    +
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        _.isDefined(this.props.user) && (this.props.user.roles.includes('OWNER')) &&
                                        <a className="dropdown-item" href="#/schedulesession">New Session</a>
                                    }

                                    {
                                        _.isDefined(this.props.user) && (this.props.user.roles.includes('SITTER')) &&
                                        <a className="dropdown-item" href="#/postings">Find Session</a>
                                    }
                                </div>
                            </li>

                            <li className="nav-item dropdown" style={{color: 'white'}}>
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'white'}}>
                                    Account
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        _.isDefined(this.props.user) && <a className="dropdown-item" href="#/mysessions">My Sessions</a>
                                    }

                                    {
                                        _.isDefined(this.props.user) && <a className="dropdown-item" href="#/editprofile">My Profile</a>
                                    }

                                    {
                                        _.isDefined(this.props.user) && <a className="dropdown-item" href="#/history">My History</a>
                                    }

                                    <div className="dropdown-divider"></div>
                                    {
                                        _.isDefined(this.props.user) && <a className="dropdown-item" href="#/" onClick={this.logoutClick}>Log out</a>
                                    }
                                </div>
                            </li>

                            {!_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/register" style={{color: 'white'}}> Register </a>
                            </li>
                            }
                            {!_.isDefined(this.props.user) &&
                            <li className="nav-item">
                                <a className="nav-link" href="/#/login" style={{color: 'white'}}> Login </a>
                            </li>
                            }
                        </ul>
                    </div>
                </nav>
			</div>
		);
	}
}

NavBar = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		logout: () => dispatch(Users.Actions.logout())
	})
)(NavBar);
