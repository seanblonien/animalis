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
        this.props.updatePets();
        this.deletePet = this.deletePet.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
    }

    onSubmit = pet => {
        pet.userPrincipal = this.props.user.principal;
        pet.id = Date.now() + Math.random();
        pet.pet_sex = this.state.pet_sex;
        this.props.addpet(pet);
        this.props.addPetToUser(pet.id);
    };

    handleSexChange = e => {
        if(e != null) {
            this.state.pet_sex = e;
            console.log('Keys: ' + Object.keys(e).join(', '));
            console.log(e);
            this.forceUpdate();

        }
    };

    deletePet = (e, id) => {
        //console.log('Keys: ' + Object.keys(e).join(', '));
        console.log('PetId: ' + id);
        this.props.deletePet(id).then();
    };

    editPet = (e, thisPet) => {
        console.log('Edit Pet current thisPet Keys: ' + Object.keys(thisPet).join(', '));
        this.setState(prevState => ({ editing: prevState.editing.add(thisPet) }));
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

                    <Bessemer.Select name="pet_sex" friendlyName="Pet Sex" placeholder="Male"
                                     validators={[Validation.requiredValidator]}
                                     options={choices} value={this.state.pet_sex}
                                     onChange={opt => this.handleSexChange(opt)}
                                     />

                    <Bessemer.Field name="pet_age" friendlyName="Pet Age" placeholder="6"
                                    validators={[Validation.requiredValidator]}/>

                    <Bessemer.Field name="pet_info" friendlyName="Additional Information" />

                    <Bessemer.Button loading={submitting}><span style={{color: '#FFF'}}>Add Pet</span></Bessemer.Button>

                    <hr />
                </form>

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

                            <Bessemer.Button className="btn btn-danger" onClick={(e) => {this.deletePet(e, pet.id);}}><span style={{color: '#FFF'}}>Delete Pet</span></Bessemer.Button>
                            <button type={'button'} className="btn btn-primary" onClick={(e) => {this.editPet(e, pet);}}>Edit this Pet</button>
                        </div>
                    ))
                    }

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
        updatePets: () => dispatch(Users.Actions.retrieve()),
        deletePet: pet => dispatch(Users.Actions.deletePet(pet)),
        addPetToUser: id => dispatch(Users.Actions.addPetToUser(id)),
    })
)(AddPet);

export default AddPet;