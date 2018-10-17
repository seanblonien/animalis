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
        return this.props.create(session);
    };

    handleCheckboxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    render() {
        let { handleSubmit, submitting } = this.props;

        return (
            <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="startday" friendlyName="Start Day" placeholder="29"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="startmonth" friendlyName="Start Month" placeholder="November"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="startyear" friendlyName="Start Year" placeholder="2018"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="starthour" friendlyName="Start Hour" placeholder="3"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="startminute" friendlyName="Start Minute" placeholder="00"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="startampm" friendlyName="Start AM/PM" placeholder="PM"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endday" friendlyName="End Day" placeholder="2"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endmonth" friendlyName="End Month" placeholder="December"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endyear" friendlyName="End Year" placeholder="2018"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endhour" friendlyName="End Hour" placeholder="10"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endminute" friendlyName="End Minute" placeholder="30"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endampm" friendlyName="End AM/PM" placeholder="AM"
                                validators={[Validation.requiredValidator]} />

                <label>Location of Sitting:</label>

                <Bessemer.Field name={'ownerLocation'} friendlyName={'My address'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('petOwner')} />} />

                <Bessemer.Field name={'sitterLocation'} friendlyName={'Sitter\'s address'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('petOwner')} />} />

                {this.state.checkedItems.get('sitterLocation') ?
                    <Bessemer.Field name="maxdist" friendlyName="Maximum distance away (miles)"
                                    placeholder="10" validators={[Validation.requiredValidator]} /> :
                    null}

                <Bessemer.Field name="notes" friendlyName="Notes" placeholder="Special Instructions"/>

                <Bessemer.Button loading={submitting}><div style={{color: '#FFF'}}>Add Session</div></Bessemer.Button>

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