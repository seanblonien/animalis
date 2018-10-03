import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

import Checkbox from 'js/Checkbox';
import OwnerRegister from 'js/OwnerRegister';
import SitterRegister from 'js/SitterRegister';
import {Link} from 'react-router-dom';


class AddPet extends React.Component {

    constructor() {
        super();
    }

    onSubmit = user => {
        return this.props.register(user);
    };

    render() {
        let { handleSubmit, submitting } = this.props;

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="petname" friendlyName="Pet Name" placeholder="Fido"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="petspecies" friendlyName="Pet Species" placeholder="Dog"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="petsize" friendlyName="Pet Size" placeholder="Medium"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Field name="petsex" friendlyName="Pet Sex" placeholder="M"
                                validators={[Validation.requiredValidator]} />

                <ButtonToolbar>
                    <DropdownButton title="Default button" id="dropdown-size-medium">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>

                <Bessemer.Field name="petage" friendlyName="Pet Age" placeholder="6"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Button loading={submitting}><Link to="/" style={{color: '#FFF'}}>Register</Link></Bessemer.Button>
            </form>
        );
    }
}

AddPet = ReduxForm.reduxForm({form: 'register'})(AddPet);

AddPet = connect(
    state => ({

    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(AddPet);

export default AddPet;