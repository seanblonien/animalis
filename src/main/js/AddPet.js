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
        this.props.getPets();
    }

    onSubmit = pet => {
        pet.userPrincipal = this.props.user.principal;
        //pet.petId = Date.now() + Math.random();
        return this.props.addpet(pet);
    };

    deletePet = (e, id) => {
        console.log('Keys: ' + Object.keys(e).join(', '));
        console.log('PetId: ' + id);
        return this.props.deletePet(id);
    };

    render() {
        let { handleSubmit, submitting } = this.props;
        let choices = ['Male', 'Female'];

        return (
            <div>
                <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                    <Bessemer.Field name="pet_name" friendlyName="Pet Name" placeholder="Fido"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_species" friendlyName="Pet Species" placeholder="Dog"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_size" friendlyName="Pet Size" placeholder="Medium"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Select name="pet_sex" friendlyName="Pet Sex" placeholder="Male"
                                     validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_age" friendlyName="Pet Age" placeholder="6"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="pet_info" friendlyName="Additional Information" />

                    <Bessemer.Button loading={submitting}><div style={{color: '#FFF'}}>Add Pet</div></Bessemer.Button>

                    <hr />

                    { _.isDefined(this.props.pets) &&
                    this.props.pets.map(pet => (
                        <div key={pet.pet_name + '_' + pet.id} className="card" style={{width: '18rem', marginBottom: 10}}>
                            <div className="card-header">
                                Name: {pet.pet_name}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="text-muted">Species: </span>{pet.pet_species}</li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="text-muted">Size: </span>{pet.pet_size}</li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="text-muted">Sex: </span>{pet.pet_sex}</li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="text-muted">Age: </span>{pet.pet_age}</li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="text-muted">Info: </span>{pet.pet_info}</li>
                            </ul>

                            <button type="button" className="btn btn-danger" onClick={(e) => {this.deletePet(e, pet.id);}} >Delete Pet</button>
                        </div>
                    ))
                    }

                </form>
            </div>
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
        addpet: pet => dispatch(Users.Actions.addpet(pet)),
        getPets: () => dispatch(Users.Actions.getPets()),
        deletePet: pet => dispatch(Users.Actions.deletePet(pet)),
    })
)(AddPet);

export default AddPet;