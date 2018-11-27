import {NotificationsNavBar} from 'js/User/NotificationsNavBar';
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
                <nav style={{backgroundColor: '#24292E'}} className="navbar navbar-expand-md navbar-fixed fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/#" style={{color: 'white'}}>
                            <img style={{margin: -9}} src="https://i.imgur.com/5YjGzlp.png"
                                 height="51" width="123    "/>
                        </a>
                        <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon navbar-dark"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul style={{color: 'white', float: 'right', marginRight: 75}} className="navbar-nav ml-auto">
                                {_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) &&
                                <li style={{borderRight: '1.5px solid white'}}>
                                    <a className="nav-link"
                                       style={{color: 'white'}}> Hi, {this.props.user.attributes.fname} </a>
                                </li>
                                }
                                <li className="nav-item ">
                                    <a className="nav-link" href="/#" style={{color: 'white'}}>🏠 Home</a>
                                </li>

                                {_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) ?
                                    <span className="d-inline-flex">
                                        <NotificationsNavBar/>
                                        <li className="nav-item dropdown" style={{color: 'white'}}>
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'white'}}>
                                                🔍 Session
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {_.isArray(this.props.user.roles) &&
                                                <div>
                                                    {this.props.user.roles.includes('OWNER') &&
                                                    <a className="dropdown-item" href="#/schedule-session"><span className="fa fa-plus-circle"/> New Session</a>
                                                    }
                                                    {this.props.user.roles.includes('SITTER') &&
                                                    <a className="dropdown-item" href="#/postings"><span className="fa fa-search-plus"/> Find Session</a>
                                                    }
                                                </div>
                                                }
                                            </div>
                                        </li>

                                        <li className="nav-item dropdown" style={{color: 'white'}}>
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'white'}}>
                                                ⚙ Account
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdown" style={{overflow: 'visible', left: 0, right: 0}}>
                                                {_.isDefined(this.props.user) &&
                                                <div>
                                                    <a className="dropdown-item" href="#/my-profile"><span className="fa fa-user"/> My Profile</a>
                                                    {this.props.user.roles.includes('OWNER') &&
                                                    <a className="dropdown-item" href="#/my-pets"><span className="fa fa-paw"/> My Pets</a>
                                                    }
                                                    <a className="dropdown-item" href="#/my-sessions"><span className="fa fa-list"/> My Sessions</a>
                                                    <a className="dropdown-item" href="#/my-history"><span className="fa fa-history"/> My History</a>
                                                    {this.props.user.roles.includes('SITTER') &&
                                                    <a className="dropdown-item" href="#/my-ratings"><span className="fa fa-star"/> My Ratings</a>
                                                    }
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#/" onClick={this.logoutClick}><span className="fa fa-sign-out"/> Log out</a>
                                                </div>

                                                }
                                            </div>
                                        </li>
                                    </span>
                                    :
                                    <div className="d-inline-flex">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#/register" style={{color: 'white'}}>📕 Register</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#/login" style={{color: 'white'}}>🔑 Login</a>
                                        </li>
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

NavBar = connect(
    state => ({
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        logout: () => dispatch(Users.Actions.logout())
    })
)(NavBar);
