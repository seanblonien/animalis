import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';

class MySessionHistory extends React.Component {
	constructor(props) {
		super(props);
		this.props.getSessions();
		this.props.retrievePets();
	}

	render() {
		return (
			<div className="row">
				<div className="col-4">
					<div>
						<h6>{this.props.user.attributes.fname} {this.props.user.attributes.lname}</h6>
						{_.isDefined(this.props.user) && this.props.user.roles.includes('OWNER') &&
						<p>Sessions as Owner:</p>
						}

						{
							_.isDefined(this.props.sessions) && this.props.sessions.map(session => (
								<div key={session.id} className="card" style={{width: '20rem', marginBottom: 10}}>
									<p>Session ID: {session.id}</p>
									<p>From: {session.startDate + ' ' + session.startTime}</p>
									<p>To: {session.endDate + ' ' + session.endTime}</p>
									<p>Sitter: {session.sitterPrincipal}</p>
									{/*{_.isDefined(this.props.session.pets) && this.props.session.pets.map(pet => (*/}
									{/*<p>Pets: </p>*/}
									{/*))}*/}
									<p>Pets: </p>
									<p>Notes: {session.notes}</p>
								</div>
							))
						}

						{_.isDefined(this.props.sessions) && !_.isEmpty(this.props.sessions) && !_.isNil(this.props.user) && this.props.sessions.map(session => (
							<div key={session.id} className="card m-md-3">
								<div className="card-header">
								</div>

								<ul className="list-group list-group-flush">

									<li className="list-group-item">
										<div>
											<span className="text-muted">Session ID: </span>{session.id}
										</div>
									</li>
									<li className="list-group-item">
										<div>
											<span className="text-muted">From: </span>{session.startDate + ' ' + session.startTime}
										</div>
									</li>
									<li className="list-group-item">
										<div>
											<span className="text-muted">To: </span>{session.endDate + ' ' + session.endTime}
										</div>
									</li>
									<li className="list-group-item">
										<div>
											<span className="text-muted">Sitter: </span>{session.sitterPrincipal}
										</div>
									</li>
									<li className="list-group-item">
										<div>
											<span className="text-muted">Bidders: </span>{session.bidderPrincipals !== null && session.bidderPrincipals.map((bidder) => (
											<span key={bidder}>{bidder}, </span>
										))}
										</div>
									</li>
									{session.sitterPrincipal.length === 0 &&
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
																	 onChange={opt => this.handleSitterChoice(opt)}
													/>
												</span>
											</div>

											{!_.isBlank(this.state.sitter_choice) &&
											<div className={'container-fluid'}>
												<div style={{textAlign: 'center'}}
													 className={'row justify-content-center'}>
													<button className={'btn btn-danger '}
															onClick={() => this.chooseSitter(session)}>Confirm
														Sitter Choice
													</button>
												</div>
											</div>
											}
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


						{_.isDefined(this.props.user) && this.props.user.roles.includes('SITTER') &&
						<p>Sessions as Sitter:</p>
						}
					</div>
				</div>
			</div>
		);
	}
}

MySessionHistory = ReduxForm.reduxForm({form: 'myMySessionHistory'})(MySessionHistory);

MySessionHistory = connect(
	state => ({
		sessions: Users.State.getSessions(state),
		user: Users.State.getUser(state),
		allSessions: Users.State.getAllSessions(state),
	}),
	dispatch => ({
		getSessions: () => dispatch(Users.Actions.getSessions()),
		retrievePets: () => dispatch(Users.Actions.retrievePets()),
		getAllSessions: () => dispatch(Users.Actions.getAllSessions()),
	})
)(MySessionHistory);

export default MySessionHistory;
