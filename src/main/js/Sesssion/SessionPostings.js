import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getSessions} from 'js/User/Users';
import {getAllSessions} from 'js/User/Users';

class SessionPostings extends React.Component {
	constructor(props) {
		super(props);

		this.props.getAllSessions();
		setTimeout(() => {for(let x in this.props.allSessions){
			console.log(x.id);
		}}, 2000);
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
										<div style={{width: '100%', textAlign: 'center'}}>
											<img src={'https://static.thenounproject.com/png/194149-200.png'} style={{height: 60, width: 60}}/>
										</div>
									</div>
									<p>Session ID: {session.id}</p>
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