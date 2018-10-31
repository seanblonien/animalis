import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';

class ScheduleSession extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
            sessionType: null,
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    onSubmit = session => {
        console.log('Session keys: ' + Object.keys(session).join(', '));
		console.log('Session values: ' + Object.values(session).join(', '));
        session.cancelled = false;
        session.session_type = this.state.sessionType;
        return this.props.scheduleSession(session);
    };

    handleSessionTypeChange(e) {
        if(e != null) {
            this.state.sessionType = e;
            this.forceUpdate();
        }
    }

    handleCheckboxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    getCurrentDate = () => {
		return new Date().toJSON().slice(0,10);
    };

    render() {
        let { handleSubmit, submitting } = this.props;
        let sessionTypes = [
            { label: 'Pet Sitting', value: 'sitting', description: 'Sitters watch your pet overnight in your home.' },
            { label: 'Pet Boarding', value: 'boarding', description: 'Your pet stays overnight in the sitter’s home.' },
            { label: 'Pet Daycare', value: 'daycare', description: 'Drop off your pet at your sitter\'s home in the morning and pick them up in the evening.' },
            { label: 'Drop-In', value: 'drop-in', description: 'Sitters stop by your home for 30 minutes to feed and play with your pet.' },
        ];


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
											  className={'form-control form-group'}/>} />

				<Bessemer.Field name="endDate" friendlyName="End Date"
								validators={[Validation.requiredValidator]}
								field={<input type="date"
											  className={'form-control form-group'}/>} />

				<Bessemer.Field name="endTime" friendlyName="End Time"
								validators={[Validation.requiredValidator]}
								field={<input type="time"
											  className={'form-control form-group'}/>} />

                <h5>Types of Services</h5>
                    <div>
                        {sessionTypes.map((type) => (
                            <div key={type.label}>
                                <p><b>{type.label}</b>: {type.description}</p>
                            </div>
                        ))}
                    </div>
                <label>Session Service</label>
                <Bessemer.Select style={{marginBottom: '2.5%'}} name="session_type"
                                 label={'Session Type'}
                                 friendlyName="Session Type" placeholder={sessionTypes[0].label}
                                 validators={[Validation.requiredValidator, Validation.safeValidator]}
                                 options={sessionTypes} value={this.state.sessionType}
                                 onChange={opt => this.handleSessionTypeChange(opt)} />

                <label>Location of Sitting:</label>

                <Bessemer.Field name={'ownerLocation'} friendlyName={'My address'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('ownerLocation')} />} />

                <Bessemer.Field name={'sitterLocation'} friendlyName={'Sitter\'s address'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('sitterLocation')} />} />

                {this.state.checkedItems.get('sitterLocation') ?
                    <Bessemer.Field name="maxDistance" friendlyName="Maximum distance away (miles)"
                                    placeholder="10" validators={[Validation.requiredValidator]} /> : null}

                <Bessemer.Field name="notes" friendlyName="Notes" placeholder="Special Instructions"/>

                <Bessemer.Button loading={submitting}>Add Session</Bessemer.Button>

                <hr />
            </form>
        );
    }
}

ScheduleSession = ReduxForm.reduxForm({form: 'schedulesession'})(ScheduleSession);

ScheduleSession = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        scheduleSession: session => dispatch(Users.Actions.scheduleSession(session))
    })
)(ScheduleSession);

export default ScheduleSession;