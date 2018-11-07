import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';

class SessionHistory extends React.Component {
	constructor(props) {
		super(props);
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
		getAllSessions: () => dispatch(Users.Actions.getAllSessions()),
	})
)(SessionHistory);

export default SessionHistory;