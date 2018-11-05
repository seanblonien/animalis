import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';

class SessionHistory extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				This is your session history :D
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
		getAllSessions: () => dispatch(Users.Actions.getAllSessions()),
	})
)(SessionHistory);

export default SessionHistory;