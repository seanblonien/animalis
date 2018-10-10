import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

class SitterProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = pet => {
        pet.userPrincipal = this.props.user.principal;
        return this.props.addpet(pet);
    };

    render() {
        let { handleSubmit, submitting } = this.props;
        let choices = ['Male', 'Female'];

        return (
            <h1>Sitter Profile Page</h1>
        );
    }
}

SitterProfile = ReduxForm.reduxForm({form: 'addpet'})(SitterProfile);

SitterProfile = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        addpet: pet => dispatch(Users.Actions.addpet(pet))
    })
)(SitterProfile);

export default SitterProfile;