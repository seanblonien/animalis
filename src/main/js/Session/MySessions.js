import {addNotification} from 'js/User/Users';
import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import {getCurrentDate} from 'js/Session/ScheduleSession';
import {sessionTypes} from 'js/Session/SessionTypes';

class MySessions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sitter_choice: '',
		};
	}

    componentDidMount() {
        this.props.getSessions().then(() => {
        	if(this.props.sessions != null && !_.isEmpty(this.props.sessions)){
                let newSessions = this.props.sessions.map(s => {
                	if(s.endDate < getCurrentDate()){
                		s.isComplete = true;
					}
				});
			}
		});
    }

	handleSitterChoice = e => {
		if (e != null) {
			this.state.sitter_choice = e;
			this.forceUpdate();
		}
	};

	getBidders = (bidders) => {
		let list = [];
		let i;
		for (i = 0; i < bidders.length; i++) {
			list.push({label: bidders[i], value: bidders[i]});
		}

		return list;
	};

	chooseSitter = (session) => {
		session.sitterPrincipal = this.state.sitter_choice;
		session.bidderPrincipals.splice(session.bidderPrincipals.indexOf(this.state.sitter_choice), 1);

		let newNotification = {
			id: Math.round(Date.now() + Math.random()),
			notificationType: 'chosenSitter',
			notificationDate: getCurrentDate().toString(),
			primaryPrincipal: session.sitterPrincipal,
			otherUserPrincipal: session.ownerPrincipal,
			dataBody: 'Congratulations, you have been chosen as the sitter for an upcoming session!',
			hasBeenRead: false,
		};
		addNotification(newNotification);
		this.props.updateSession(session);
	};

	render() {
		return (
			<div className="row">
				<div className="col-8">
					<div>
						{_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) &&
						<h5>{this.props.user.attributes.fname} {this.props.user.attributes.lname}</h5>
						}

						{_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) && this.props.user.roles.includes('OWNER') && !_.isEmpty(this.props.sessions) &&
						<h6>Owner Sessions:</h6>
						}

						{_.isDefined(this.props.sessions) && !_.isEmpty(this.props.sessions) && !_.isNil(this.props.user) && this.props.user.roles.includes('OWNER') && this.props.sessions.map(session => (
							session.startDate >= getCurrentDate() && session.ownerPrincipal === this.props.user.principal &&
							<div key={session.id} className="card m-md-3">
								<div className="card-header">
									<div className={'row'}>
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

								<ul className="list-group list-group-flush">

									<li className="list-group-item">
										<div>
											<span className="text-muted">Session ID: </span>{session.id}
										</div>
									</li>

									<li className="list-group-item">
										<div>
											<span
												className="text-muted">From: </span>{session.startDate + ' ' + session.startTime}
										</div>
									</li>

									<li className="list-group-item">
										<div>
											<span
												className="text-muted">To: </span>{session.endDate + ' ' + session.endTime}
										</div>
									</li>

									{!_.isEmpty(session.sitterPrincipal) &&
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter: </span>{session.sitterPrincipal}
										</div>
									</li>
									}

									{!_.isEmpty(session.bidderPrincipals) &&
									<li className="list-group-item">
										<div>
											<span
												className="text-muted">Bidders: </span>{session.bidderPrincipals !== null && session.bidderPrincipals.map((bidder) => (
											<span key={bidder}>{bidder}, </span>
										))}
										</div>
									</li>
									}

									{_.isEmpty(session.sitterPrincipal) && !_.isEmpty(session.bidderPrincipals) &&
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter Choice:</span>
											<div>
													<span className={'row'}
														  style={{
															  verticalAlign: 'middle',
															  width: '100%',
															  marginBottom: 15
														  }}>
														<label className={'col-4 d-inline-block'}>Sitter Choice</label>
														<Bessemer.Select name="sitter_choice"
																		 className={'col-8 d-inline-block'}
																		 friendlyName="Choose Sitter"
																		 placeholder="Choose a Sitter"
																		 validators={[Validation.requiredValidator, Validation.safeValidator]}
																		 options={this.getBidders(session.bidderPrincipals)}
																		 value={this.state.sitter_choice}
																		 onChange={opt => this.handleSitterChoice(opt)}/>
													</span>
											</div>

											{!_.isBlank(this.state.sitter_choice) &&
											<div className={'container-fluid'}>
												<div style={{textAlign: 'center'}}
													 className={'row justify-content-center'}>
													<button className={'btn btn-danger '}
															onClick={() => this.chooseSitter(session)}>Confirm Sitter
														Choice
													</button>
												</div>
											</div>
											}
										</div>
									</li>
									}

									{_.isEmpty(session.sitterPrincipal) && _.isEmpty(session.bidderPrincipals) &&
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter Choice: </span>No bids on this session.
										</div>
									</li>
									}

									<li className="list-group-item">
										<div>
											<span className="text-muted">Pets: </span>{session.pets.toString()}
										</div>
									</li>

									<li className="list-group-item">
										<div>
											<span className="text-muted">Notes: </span>{session.notes}
										</div>
									</li>
								</ul>
							</div>
						))
						}

						{_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) && this.props.user.roles.includes('SITTER') &&
						<h6>Sitter Sessions:</h6>
						}

						{_.isDefined(this.props.sessions) && !_.isEmpty(this.props.sessions) && !_.isNil(this.props.user) && this.props.user.roles.includes('SITTER') && this.props.sessions.map(session => (
							session.startDate >= getCurrentDate() && session.sitterPrincipal === this.props.user.principal &&
							<div key={session.id} className="card m-md-3">
								<div className="card-header">
									<div className={'row'}>
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

								<ul className="list-group list-group-flush">

									<li className="list-group-item">
										<div>
											<span className="text-muted">Session ID: </span>{session.id}
										</div>
									</li>

									<li className="list-group-item">
										<div>
											<span
												className="text-muted">From: </span>{session.startDate + ' ' + session.startTime}
										</div>
									</li>

									<li className="list-group-item">
										<div>
											<span
												className="text-muted">To: </span>{session.endDate + ' ' + session.endTime}
										</div>
									</li>

									{!_.isEmpty(session.sitterPrincipal) &&
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter: </span>{session.sitterPrincipal}
										</div>
									</li>
									}

									{!_.isEmpty(session.bidderPrincipals) &&
									<li className="list-group-item">
										<div>
											<span
												className="text-muted">Bidders: </span>{session.bidderPrincipals !== null && session.bidderPrincipals.map((bidder) => (
											<span key={bidder}>{bidder}, </span>
										))}
										</div>
									</li>
									}

									{_.isEmpty(session.sitterPrincipal) && !_.isEmpty(session.bidderPrincipals) &&
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter Choice:</span>
											<div>
													<span className={'row'}
														  style={{
															  verticalAlign: 'middle',
															  width: '100%',
															  marginBottom: 15
														  }}>
														<label className={'col-4 d-inline-block'}>Sitter Choice</label>
														<Bessemer.Select name="sitter_choice"
																		 className={'col-8 d-inline-block'}
																		 friendlyName="Choose Sitter"
																		 placeholder="Choose a Sitter"
																		 validators={[Validation.requiredValidator, Validation.safeValidator]}
																		 options={this.getBidders(session.bidderPrincipals)}
																		 value={this.state.sitter_choice}
																		 onChange={opt => this.handleSitterChoice(opt)}/>
													</span>
											</div>

											{!_.isBlank(this.state.sitter_choice) &&
											<div className={'container-fluid'}>
												<div style={{textAlign: 'center'}}
													 className={'row justify-content-center'}>
													<button className={'btn btn-danger '}
															onClick={() => this.chooseSitter(session)}>Confirm Sitter
														Choice
													</button>
												</div>
											</div>
											}
										</div>
									</li>
									}

									{_.isEmpty(session.sitterPrincipal) && _.isEmpty(session.bidderPrincipals) &&
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter Choice: </span>No bids on this session.
										</div>
									</li>
									}

									<li className="list-group-item">
										<div>
											<span className="text-muted">Pets: </span>{session.pets.toString()}
										</div>
									</li>

									<li className="list-group-item">
										<div>
											<span className="text-muted">Notes: </span>{session.notes}
										</div>
									</li>
								</ul>
							</div>
						))
						}


					</div>
				</div>
			</div>
		);
	}
}

MySessions = ReduxForm.reduxForm({form: 'mySessions'})(MySessions);

MySessions = connect(
	state => ({
		sessions: Users.State.getSessions(state),
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		getSessions: () => dispatch(Users.Actions.fetchSessions()),
		updateSession: (session) => dispatch(Users.Actions.updateSession(session)),
	})
)(MySessions);

export default MySessions;
