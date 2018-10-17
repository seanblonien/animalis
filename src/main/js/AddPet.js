import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

class AddPet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: new Set(),
            pet_sex: null,
        };
        this.props.retrievePets();
    }

    onSubmit = pet => {
        pet.userPrincipal = this.props.user.principal;
        pet.id = Date.now() + Math.random();
        pet.pet_sex = this.state.pet_sex;
        this.props.addpet(pet);
        this.props.addPetToUser(pet.id);
    };

    render() {
        let { handleSubmit, submitting} = this.props;
        let choices = [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ];

        return (
            <div>
                <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                    <Bessemer.Field name="pet_name" friendlyName="Pet Name" placeholder="Fido"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_species" friendlyName="Pet Species" placeholder="Dog"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_size" friendlyName="Pet Size" placeholder="Medium"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_sex" friendlyName="Pet Sex" placeholder="Male"
                                    validators={[Validation.requiredValidator, Validation.sexValidator]} />

                    {/*Pet Sex<Bessemer.Select style={{marginBottom: '2.5%'}} name="pet_sex"*/}
                                     {/*friendlyName="Pet Sex" placeholder="Male"*/}
                                     {/*validators={[Validation.requiredValidator]}*/}
                                     {/*options={choices} value={this.state.pet_sex}*/}
                                     {/*onChange={opt => this.handleSexChange(opt)} />*/}


                    <Bessemer.Field name="pet_age" friendlyName="Pet Age" placeholder="6"
                                    validators={[Validation.requiredValidator]}/>

                    <Bessemer.Field name="pet_info" friendlyName="Additional Pet Info" />

                    <Bessemer.Button loading={submitting}><span style={{color: '#FFF'}}>Add Pet</span></Bessemer.Button>

                    <hr />
                </form>

            </div>
        );
    }
}

AddPet = ReduxForm.reduxForm({form: 'addpet'})(AddPet);

AddPet = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        addpet: pet => dispatch(Users.Actions.addpet(pet)),
        retrievePets: () => dispatch(Users.Actions.retrieve()),
        addPetToUser: id => dispatch(Users.Actions.addPetToUser(id)),
    })
)(AddPet);

export default AddPet;