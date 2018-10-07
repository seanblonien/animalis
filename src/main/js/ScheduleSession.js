import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Link} from 'react-router-dom';

class ScheduleSession extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    //
    // onSubmit = pet => {
    //     pet.userPrincipal = this.props.user.principal;
    //     return this.props.addpet(pet);
    // };

    render() {
        let { handleSubmit, submitting } = this.props;

        return (
            <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="startdate" friendlyName="Start Date" placeholder="never"
                                validators={[Validation.requiredValidator]} />

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