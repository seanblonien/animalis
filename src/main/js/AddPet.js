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
        return this.props.addpet(pet);
    };

    render() {
        let { handleSubmit, submitting } = this.props;
        let choices = ['Male', 'Female'];

        return (
            <div>
                <form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                    <Bessemer.Field name="petname" friendlyName="Pet Name" placeholder="Fido"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="petspecies" friendlyName="Pet Species" placeholder="Dog"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="petsize" friendlyName="Pet Size" placeholder="Medium"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Select name="petsex" friendlyName="Pet Sex" placeholder="Male"
                                     validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="petage" friendlyName="Pet Age" placeholder="6"
                                    validators={[Validation.requiredValidator]} />

                    <Bessemer.Field name="petinfo" friendlyName="Additional Information" />

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
    })
)(AddPet);

export default AddPet;