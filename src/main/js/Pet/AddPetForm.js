import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import waitToUpdateTime from 'js/Pet/PetList';

class AddPetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: new Set(),
            pet_sex: null,
        };
        this.handleSexChange = this.handleSexChange.bind(this);
    }

    onSubmit = pet => {
        pet.userPrincipal = this.props.user.principal;
        pet.id = Math.round(Date.now() + Math.random());
        pet.pet_sex = this.state.pet_sex;
        console.log('Values: ' + Object.values(pet).join(', '));
        this.props.addPet(pet);
        this.props.addPetToUser(pet.id);
		setTimeout(this.props.retrievePets, waitToUpdateTime);
    };

    handleSexChange = e => {
        if(e != null) {
            this.state.pet_sex = e;
            this.forceUpdate();
        }
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
                                    validators={[Validation.requiredValidator, Validation.safeValidator]} />

                    <Bessemer.Field name="pet_species" friendlyName="Pet Species" placeholder="Dog"
                                    validators={[Validation.requiredValidator, Validation.safeValidator]} />

                    <Bessemer.Field name="pet_size" friendlyName="Pet Size" placeholder="Medium"
                                    validators={[Validation.requiredValidator, Validation.safeValidator]} />

                    {/*<Bessemer.Field name="pet_sex" friendlyName="Pet Sex" placeholder="Male"*/}
                                    {/*validators={[Validation.requiredValidator, Validation.sexValidator]} />*/}

                    {/*<Bessemer.Field name="pet_sex" friendlyName="Pet Sex" placeholder="Male"*/}
                                    {/*validators={[Validation.requiredValidator]}*/}
                                    {/*field={<input type="date"*/}
                                                  {/*className={'form-control form-group'}/>} />*/}

                    <Bessemer.Select style={{marginBottom: '2.5%'}} name="pet_sex"
                                     label={'Pet Sex'}
                                     friendlyName="Pet Sex" placeholder="Male"
                                     validators={[Validation.requiredValidator, Validation.safeValidator]}
                                     options={choices} value={this.state.pet_sex}
                                     onChange={opt => this.handleSexChange(opt)} />


                    <Bessemer.Field name="pet_age" friendlyName="Pet Age" placeholder="6"
                                    validators={[Validation.requiredValidator, Validation.safeValidator]}/>

                    <Bessemer.Field name="pet_info" friendlyName="Additional Pet Info"
									validators={[Validation.safeValidator]}/>

                    <Bessemer.Button loading={submitting}>Add Pet</Bessemer.Button>

                </form>

            </div>
        );
    }
}

AddPetForm = ReduxForm.reduxForm({form: 'addPet'})(AddPetForm);

AddPetForm = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        addpet: pet => dispatch(Users.Actions.addPet(pet)),
        retrievePets: () => dispatch(Users.Actions.retrieve()),
        addPetToUser: id => dispatch(Users.Actions.addPetToUser(id)),
    })
)(AddPetForm);

export default AddPetForm;