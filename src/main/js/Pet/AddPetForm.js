import * as Users from 'js/User/Users';
import { addPet } from 'js/User/Users';
import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

export const sexOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
];

export const sizeOptions = [
    {label: 'Small (0-15 lbs)', value: 'Small'},
    {label: 'Medium (16-40 lbs)', value: 'Medium'},
    {label: 'Large (41-100 lbs)', value: 'Large'},
    {label: 'Giant (101+ lbs)', value: 'Giant'}
];

class AddPetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: new Set(),
            pet_sex: null,
            pet_size: null,
            toggle: false,
        };
    }

    onSubmit = pet => {
        pet.id = Math.round(Date.now() + Math.random());
        pet.pet_sex = this.state.pet_sex;
        pet.pet_size = this.state.pet_size;
        pet.pet_age = Number(pet.pet_age);
        console.log('Keys: ' + Object.keys(pet).join(', '));
        this.resetForm();

        this.props.addPet(pet);
    };

    resetForm = () => {
        this.props.dispatch(ReduxForm.reset('addPet'));
        this.state.pet_size = this.state.pet_sex = null;
        this.setState(this.state);
    };

    handleSexChange = e => {
        if (e != null) {
            this.state.pet_sex = e;
            this.setState(this.state);
        }
    };

    handleSizeChange = e => {
        if (e != null) {
            this.state.pet_size = e;
            this.setState(this.state);
        }
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        return (
            <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))} className={'form-group'}>
                <Bessemer.Field name="pet_name" friendlyName="Pet Name" placeholder="Fido"
                                validators={[Validation.requiredValidator, Validation.safeValidator]}/>

                <Bessemer.Field name="pet_species" friendlyName="Pet Species" placeholder="Dog"
                                validators={[Validation.requiredValidator, Validation.safeValidator]}/>

                <span className="row align-content-center mb-3">
                    <label className={'col-4 d-inline-block'}>Pet Size*</label>
                    <Bessemer.Select name="pet_size"
                                     className={'col-8 d-inline-block'}
                                     friendlyName="Pet Size" placeholder="Small"
                                     validators={[Validation.requiredValidator, Validation.safeValidator]}
                                     options={sizeOptions} value={this.state.pet_size}
                                     onChange={opt => this.handleSizeChange(opt)}/>
                </span>

                <span className="row align-content-center mb-3">
                    <label className={'col-4 d-inline-block'}>Pet Sex*</label>
                    <Bessemer.Select name="pet_sex"
                                     className={'col-8 d-inline-block'}
                                     friendlyName="Pet Sex" placeholder="Male"
                                     validators={[Validation.requiredValidator, Validation.safeValidator]}
                                     options={sexOptions} value={this.state.pet_sex}
                                     onChange={opt => this.handleSexChange(opt)}/>
                </span>

                <Bessemer.Field name="pet_age" friendlyName="Pet Age" placeholder="6"
                                validators={[Validation.requiredValidator, Validation.safeValidator, Validation.numberValidator]}/>

                <Bessemer.Field name="pet_info" friendlyName="Additional Pet Info"
                                validators={[Validation.safeValidator]}/>

                <Bessemer.Button loading={submitting}>Add Pet</Bessemer.Button>
                <div className="btn btn-secondary mx-3" onClick={() => this.resetForm()}>Reset Form</div>
            </form>
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
        addPet: (pet) => dispatch(Users.Actions.addPet(pet)),
    })
)(AddPetForm);

export default AddPetForm;
