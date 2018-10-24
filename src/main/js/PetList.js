import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

export const waitToUpdateTime = 2000; // ms

class PetList extends React.Component {
    constructor(props) {
        super(props);
        this.props.retrievePets();
        this.deletePet = this.deletePet.bind(this);
    }

    deletePet = (e, id) => {
        console.log('Deleting pet with id: ' + id);
        this.props.deletePet(id);
		setTimeout(this.props.retrievePets, waitToUpdateTime);
    };

    editPet = (e, pet) => {
        if(this.props.pets.includes(pet)){
			console.log('Editing pet with id: ' + pet.id + ' with editing status of ' + pet.editing);
			pet.editing = !pet.editing;
			this.forceUpdate();
        }
    };

    submitPet = (petForm, pet) => {
        // console.log('submitPet for UPDATING');
        // console.log('petForm keys:' + Object.keys(petForm).join(', '));
        // console.log('petForm values:' + Object.values(petForm).join(', '));
        // console.log('pet keys:' + Object.keys(pet).join(', '));
        // console.log('pet values:' + Object.values(pet).join(', '));
        //console.log('pet id:' + pet.id);
        petForm.id = pet.id;
        if(petForm.pet_name == null) petForm.pet_name = pet.pet_name;
        if(petForm.pet_species == null) petForm.pet_species = pet.pet_species;
        if(petForm.pet_size == null) petForm.pet_size = pet.pet_size;
        if(petForm.pet_sex == null) petForm.pet_sex = pet.pet_sex;
        if(petForm.pet_age == null) petForm.pet_age = pet.pet_age;
        if(petForm.pet_info == null) petForm.pet_info = pet.pet_info;

        this.props.updatePet(petForm);
		setTimeout(this.props.retrievePets, waitToUpdateTime);
    };

    render() {
        let { handleSubmit, submitting} = this.props;

        let parent = this;

        return (
            <div>
                { _.isDefined(this.props.pets) && this.props.pets.length !== 0 &&
                    <div>
                        <h3>Pet List</h3>
                        {this.props.pets.map(pet => (
                            _.isDefined(pet) && _.isDefined(pet.pet_name) &&
                            <div key={pet.pet_name + '_' + pet.id} className="card" style={{width: '20rem', marginBottom: 10}}>
                                <form name="editPet" onSubmit={handleSubmit(form => parent.submitPet(form, pet))}>
                                    <div className="card-header">
                                        <div style={{display: 'inline'}}>
                                            { pet.editing === true &&
                                            <Bessemer.Field name="pet_name" friendlyName="Pet Name"
                                                            placeholder={pet.pet_name == null ? 'Fido' : pet.pet_name} />
                                            }
                                            { pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Pet Name: </span>{pet.pet_name}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div style={{display: 'inline'}}>
                                                { pet.editing === true &&
                                                <Bessemer.Field name="pet_species" friendlyName="Pet Species"
                                                                placeholder={pet.pet_species == null ? 'Dog' : pet.pet_species}/>
                                                }
                                                { pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Species: </span>{pet.pet_species}
                                                </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div style={{display: 'inline'}}>
                                                { pet.editing === true &&
                                                <Bessemer.Field name="pet_size" friendlyName="Pet Size"
                                                                placeholder={pet.pet_size == null ? 'Medium' : pet.pet_size}/>
                                                }
                                                { pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Size: </span>{pet.pet_size}
                                                </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div style={{display: 'inline'}}>
                                                { pet.editing === true &&
                                                <Bessemer.Field name="pet_sex" friendlyName="Pet Sex"
                                                                placeholder={pet.pet_sex == null ? 'Male' : pet.pet_sex}/>
                                                }
                                                { pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Sex: </span>{pet.pet_sex}
                                                </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div style={{display: 'inline'}}>
                                                { pet.editing === true &&
                                                <Bessemer.Field name="pet_age" friendlyName="Pet Age"
                                                                placeholder={pet.pet_age == null ? '4' : pet.pet_age}/>
                                                }
                                                { pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Age: </span>{pet.pet_age}
                                                </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div style={{display: 'inline'}}>
                                                { pet.editing === true &&
                                                <Bessemer.Field name="pet_info" friendlyName="Pet Info"
                                                                placeholder={pet.pet_info == null ? 'Additional pet information here.' : pet.pet_info}/>
                                                }
                                                { pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Info: </span>{pet.pet_info}
                                                </div>
                                                }
                                            </div>
                                        </li>
                                    </ul>

                                    <div style={{textAlign: 'center', marginTop: 10}}>

                                        {pet.editing === false &&
                                        <div>
                                            <button type={'button'} className="btn btn-danger btn-sm"  style={{width: 'auto', margin: 10}}
                                                    onClick={(e) => {parent.deletePet(e, pet.id);}}>Delete Pet</button>
                                            <button type={'button'} className="btn btn-primary btn-sm" style={{width: 'auto', margin: 10}}
                                                    onClick={(e) => {parent.editPet(e, pet);}}>Edit Pet</button>
                                        </div>
                                        }
                                        {pet.editing === true &&
                                        <Bessemer.Button className="btn btn-success btn-sm" style={{width: 'auto'}}
                                                         loading={submitting}>Done Editing Pet</Bessemer.Button>
                                        }
                                    </div>
                                </form>
                            </div>
                        ))}</div>

                }

            </div>
        );
    }
}

PetList = ReduxForm.reduxForm({form: 'PetList'})(PetList);

PetList = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        updatePet: pet => dispatch(Users.Actions.updatePet(pet)),
        retrievePets: () => dispatch(Users.Actions.retrieve()),
        deletePet: pet => dispatch(Users.Actions.deletePet(pet)),
    })
)(PetList);

export default PetList;