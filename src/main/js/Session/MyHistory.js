import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';
import {getCurrentDate} from 'js/Session/ScheduleSession';
import {sessionTypes} from 'js/Session/SessionTypes';

class MyHistory extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
        this.props.fetchSessions();
        this.props.fetchPets();
    }

	render() {
		return (
			<div className="row">
				<div className="col-4">
					<div>
						{_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) &&
						<h5>{this.props.user.attributes.fname} {this.props.user.attributes.lname}</h5>
						}

						{_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) && this.props.user.roles.includes('OWNER') &&
						<h6>Sessions as Owner:</h6>
						}

						{_.isDefined(this.props.sessions) && !_.isEmpty(this.props.sessions) && !_.isNil(this.props.user) && this.props.sessions.map(session => (
							session.startDate < getCurrentDate() &&
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

MyHistory = ReduxForm.reduxForm({form: 'myMySessionHistory'})(MyHistory);

MyHistory = connect(
	state => ({
		sessions: Users.State.getSessions(state),
		user: Users.State.getUser(state),
		allSessions: Users.State.getAllSessions(state),
	}),
	dispatch => ({
        fetchSessions: () => dispatch(Users.Actions.fetchSessions()),
        fetchPets: () => dispatch(Users.Actions.fetchPets()),
        fetchAllSessions: () => dispatch(Users.Actions.fetchAllSessions()),
	})
)(MyHistory);

export default MyHistory;
