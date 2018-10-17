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
                <Bessemer.Field name="startdate" friendlyName="Start Date" placeholder="never"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="starttime" friendlyName="Start Time" placeholder="never"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="enddate" friendlyName="End Date" placeholder="never"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="endtime" friendlyName="End Time" placeholder="never"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name={'ownerLocation'} friendlyName={'Location of owner'}
                                onChange={this.handleCheckboxChange}
                                field={<input type="checkbox" value={this.state.checkedItems.get('petOwner')} />} />

                <Bessemer.Field name={'sitterLocation'} friendlyName={'Location of sitter'}
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

ScheduleSession = ReduxForm.reduxForm({form: 'addpet'})(ScheduleSession);

// ScheduleSession = connect(
//     state => ({
//         pets: Users.State.getPets(state),
//         user: Users.State.getUser(state)
//     }),
//     dispatch => ({
//         addpet: pet => dispatch(Users.Actions.addpet(pet))
//     })
// )(ScheduleSession);

export default ScheduleSession;