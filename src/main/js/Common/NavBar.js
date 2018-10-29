import React from 'react';
import Cookies from 'universal-cookie';
import Redirect from 'react-router-dom/es/Redirect';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/users';

export class NavBar extends React.Component {
	onSubmit = () => {
		const cookies = new Cookies();
		return <Redirect to='/editprofile' />;
	};

	logoutClick = () => {
		return this.props.logout();
	};

	render() {
		return (
			<nav style={{backgroundColor: '#000000'}} className="navbar navbar-expand-md">
				<a className="navbar-brand" href="/#" style={{color:'white'}} >Tempeturs Web App </a>
				<button className="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation" style={{color:'white'}}>
					<span className="navbar-toggler-icon" style={{color:'white'}}></span>
				</button>

				<div className="collapse navbar-collapse justify-content-end" id="navbarCollapse" >
					<ul style={{color:'white', float:'right'}} className="nav navbar-nav navbn ml-auto" >
						{_.isDefined(this.props.user) &&
						<li className="nav-item" style={{borderRight:'1.5px solid white'}}>
							<a className="nav-link" style={{color: 'white'}}> Hi, {this.props.user.attributes.fname} </a>
						</li>
						}
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
						{_.isDefined(this.props.user) && (this.props.user.roles.includes('OWNER')) &&
						<li className="nav-item">
							<a className="nav-link" href="/#/schedulesession" style={{color: 'white'}}> Schedule </a>
						</li>
						}
						{_.isDefined(this.props.user) && (this.props.user.roles.includes('SITTER')) &&
						<li className="nav-item">
							<a className="nav-link" href="/#/scheduleposting" style={{color: 'white'}}> Postings </a>
						</li>
						}
						{_.isDefined(this.props.user) && (this.props.user.roles.includes('OWNER')) &&
						<li className="nav-item">
							<a className="nav-link" href="/#/rate" style={{color: 'white'}}> Rate </a>
						</li>
						}
						{_.isDefined(this.props.user) &&
						<li className="nav-item">
							<a className="nav-link" href="/#/" style={{color: 'white'}} onClick={this.logoutClick}> Logout </a>
						</li>
						}
					</ul>
				</div>
			</nav>
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