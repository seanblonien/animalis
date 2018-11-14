import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';

class SessionHistory extends React.Component {
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

						{_.isDefined(this.props.user) && this.props.user.roles.includes('SITTER') &&
							<p>Sessions as Sitter:</p>
						}
					</div>
				</div>
			</div>
		);
	}
}

SessionHistory = ReduxForm.reduxForm({form: 'sessionHistory'})(SessionHistory);

SessionHistory = connect(
	state => ({
		sessions: Users.State.getSessions(state),
		user: Users.State.getUser(state),
		allSessions: Users.State.getAllSessions(state),
	}),
	dispatch => ({
		getSessions: () => dispatch(Users.Actions.getSessions()),
		retrievePets: () => dispatch(Users.Actions.retrieve()),
		getAllSessions: () => dispatch(Users.Actions.getAllSessions()),
	})
)(SessionHistory);

export default SessionHistory;