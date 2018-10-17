import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Link} from 'react-router-dom';

class ScheduleSession extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    onSubmit = session => {
        console.log('Session keys: ' + Object.keys(session));
		console.log('Session values: ' + Object.values(session));
        //return this.props.create(session);
    };

    handleCheckboxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    getCurrentDate = () => {
		return new Date().toJSON().slice(0,10);
    };

	getCurrentTime = () => {
		let d = new Date(),
			h = (d.getHours()<10?'0':'') + d.getHours(),
			m = (d.getMinutes()<10?'0':'') + d.getMinutes();
		return h + ':' + m;
	};

    render() {
        let { handleSubmit, submitting } = this.props;


        return (
            <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="startDate" friendlyName="Start Date"
								validators={[Validation.requiredValidator]}
								field={<input type="date"
                                              min={this.getCurrentDate()}
                                              className={'form-control form-group'}/>} />

				<Bessemer.Field name="startTime" friendlyName="Start Time"
								validators={[Validation.requiredValidator]}
								field={<input type="time"
											  min={this.getCurrentTime()}
											  className={'form-control form-group'}/>} />

				<Bessemer.Field name="endDate" friendlyName="End Date"
								validators={[Validation.requiredValidator]}
								field={<input type="date"
											  className={'form-control form-group'}/>} />

				<Bessemer.Field name="endTime" friendlyName="End Time"
								validators={[Validation.requiredValidator]}
								field={<input type="time"
											  className={'form-control form-group'}/>} />

                <label>Location of Sitting:</label>

                <Bessemer.Field name={'ownerLocation'} friendlyName={'My address'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('ownerLocation')} />} />

                <Bessemer.Field name={'sitterLocation'} friendlyName={'Sitter\'s address'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('sitterLocation')} />} />

                {this.state.checkedItems.get('sitterLocation') ?
                    <Bessemer.Field name="maxdist" friendlyName="Maximum distance away (miles)"
                                    placeholder="10" validators={[Validation.requiredValidator]} /> :
                    null}

                <Bessemer.Field name="notes" friendlyName="Notes" placeholder="Special Instructions"/>

                <Bessemer.Button loading={submitting}>Add Session</Bessemer.Button>

                <hr />
            </form>
        );
    }
}

ScheduleSession = ReduxForm.reduxForm({form: 'schedulesession'})(ScheduleSession);

// ScheduleSession = connect(
//     state => ({
//         pets: Users.State.getPets(state),
//         user: Users.State.getUser(state)
//     }),
//     dispatch => ({
//         scheduleSession: session => dispatch(Users.Actions.scheduleSession(session))
//     })
// )(ScheduleSession);

export default ScheduleSession;