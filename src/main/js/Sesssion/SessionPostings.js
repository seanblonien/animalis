import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getSessions} from 'js/User/Users';
import {getAllSessions} from 'js/User/Users';
import {getUser} from 'js/User/Users';
import {getPublicUser} from 'js/User/Users';
import {sessionTypes} from 'js/Sesssion/SessionTypes';

class SessionPostings extends React.Component {
	constructor(props) {
		super(props);

		this.props.getAllSessions();
		this.state = {
			usersWithSessions: new Map(),
		};
	}

	getSessionDetails(principal){
		if(this.state.usersWithSessions.has(principal)){
			let x = this.state.usersWithSessions.get(principal);
			x.details = !x.details;
			console.log(JSON.stringify(x));
			this.state.usersWithSessions.set(principal, x);
			this.forceUpdate();
        } else {
            console.log('Getting public user with principal ' + (principal));
            getPublicUser(principal).then((res) => {
                res.details = true;
                this.state.usersWithSessions.set(principal, res);
                console.log('## ' + this.state.usersWithSessions.get(principal));
                this.forceUpdate();
            });
		}

	}

	bid(session){

	}

	isInFilter(session) {
		return true;
	}

	render() {
		let {handleSubmit, submitting} = this.props;

		return (
			<div>
				{/* Filter Form */}
				<div>
					Add filter options here!

					<hr/>
				</div>
				{/* Postings Listing */}
				<h4>All Postings</h4>
				<div>
					{!_.isNil(this.props.allSessions) && this.props.allSessions.length > 0 &&
					<div>
						{this.props.allSessions.map(session => (
							this.isInFilter(session) &&
								<div key={session.id} className="card"
									 style={{width: '20rem', marginBottom: 10}}>
									<div className="card-header">
										<div className={'row justify-content-md-center align-items-center'}>
											{sessionTypes.map((type) => (
												<div key={type.label}>
													{type.value === session.sessionType &&
													<div className={'col-4'}>
                                                        <img src={type.image} style={{height: 50, width: 50}}/>
													</div>
													}
												</div>
												))
											}
											<div  className={'container-fluid col-8 mt-2'} style={{textAlign: 'right'}}>
                                                <button className={'btn btn-secondary'} onClick={() => this.getSessionDetails(session.ownerPrincipal)}> Get Details</button>
											</div>
										</div>
										<div className={'mt-1'}>
                                            {sessionTypes.map((type) => (
                                                <div key={type.label}>
                                                    {type.value === session.sessionType &&
                                                    <div>
                                                        <p>{type.label}</p>
                                                    </div>
                                                    }
                                                </div>
                                            ))
                                            }
										</div>
									</div>
									<div className={'m-3'} style={{width: '20rem'}}>
										{/*Session details*/}
                                        <img src={'https://static.thenounproject.com/png/194149-200.png'} style={{height: 60, width: 60}}/>
                                        <p>Session ID: {session.id}</p>
                                        <p>Pet Breeds: {}</p>
                                        <p>From: {session.startDate + ' ' + session.startTime}</p>
										<p>To: {session.endDate + ' ' + session.endTime}</p>
										{/*Pet owner details*/}
                                        {this.state.usersWithSessions.has(session.ownerPrincipal) && this.state.usersWithSessions.get(session.ownerPrincipal).details &&
                                        <div>
											{'Owner: ' + this.state.usersWithSessions.get(session.ownerPrincipal).attributes.fname + ' ' +
                                            this.state.usersWithSessions.get(session.ownerPrincipal).attributes.lname}
                                        </div>
                                        }
										<div className={'container-fluid'}>
                                            <div style={{textAlign: 'center'}} className={'row justify-content-center'}>
                                                <button className={'btn btn-danger col-6'} onClick={() => this.bid(session)}> Bid</button>
                                            </div>
										</div>

									</div>
								</div>
						))
						}
					</div>
					}

					{_.isNil(this.props.allSessions) &&
					<div>Postings is empty</div>
					}

				</div>
			</div>
		);
	}
}

SessionPostings = ReduxForm.reduxForm({form: 'sessionpostings'})(SessionPostings);

SessionPostings = connect(
	state => ({
		sessions: Users.State.getSessions(state),
		user: Users.State.getUser(state),
		allSessions: Users.State.getAllSessions(state),
	}),
	dispatch => ({
		getAllSessions: () => dispatch(Users.Actions.getAllSessions()),
	})
)(SessionPostings);

export default SessionPostings;