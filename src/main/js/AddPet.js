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

    onSubmit = pet => {
        pet.userPrincipal = this.props.user.principal;
        return this.props.addpet(pet);
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

                <div className="col-6 offset-md-4">
                    <ButtonToolbar>
                        <DropdownButton title="Pet Sex" id="dropdown-size-medium">
                            <MenuItem eventKey="1">Male</MenuItem>
                            <MenuItem eventKey="2">Female</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </div>

                <Bessemer.Field name="petage" friendlyName="Pet Age" placeholder="6"
                                validators={[Validation.requiredValidator]} />

                <Bessemer.Button loading={submitting}><div style={{color: '#FFF'}}>Add Pet</div></Bessemer.Button>
            </form>
        );
    }
}

AddPet = ReduxForm.reduxForm({form: 'addpet'})(AddPet);

AddPet = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        addpet: pet => dispatch(Users.Actions.addpet(pet))
    })
)(AddPet);

export default AddPet;