import { Loading } from 'js/Common/Loading';
import { makeToast, Toasts } from 'js/Common/Toasts';
import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import { Button, Field, Select } from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import { toast } from 'react-toastify';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { sexOptions, sizeOptions } from 'js/Pet/AddPetForm';

export const waitToUpdateTime = 1500; // ms

class PetList extends React.Component {
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
    deletePet = (e, id) => {
        console.log('Deleting pet with id: ' + id);
        Users.deletePet(id);
        setTimeout(() => {
            this.props.retrievePets().then(() => {
                this.state.toggle = !this.state.toggle;
                this.setState(this.state);
                makeToast(Toasts.Successful.DeletePet);
            });
        }, waitToUpdateTime);
    };
    editPet = (e, pet) => {
        this.toggleAllEditingToFalse();
        this.resetForm();
        if (this.props.pets.includes(pet)) {
            pet.editing = true;
            this.state.toggle = !this.state.toggle;
            this.setState(this.state);
        }
    };
    submitPet = (petForm, pet) => {
        let petToUpdate = JSON.parse(JSON.stringify(petForm));

        this.toggleAllEditingToFalse();

        if (!_.isEmpty(petForm)) {
            petToUpdate.id = pet.id;
            if (petToUpdate.pet_name == null) petToUpdate.pet_name = pet.pet_name;
            if (petToUpdate.pet_species == null) petToUpdate.pet_species = pet.pet_species;
            if (petToUpdate.pet_size == null) petToUpdate.pet_size = pet.pet_size;
            if (petToUpdate.pet_sex == null) petToUpdate.pet_sex = pet.pet_sex;
            if (petToUpdate.pet_age == null) petToUpdate.pet_age = pet.pet_age;
            if (petToUpdate.pet_info == null) petToUpdate.pet_info = pet.pet_info;

            Users.updatePet(petToUpdate).then(() => {
                this.resetForm(petForm);
            });
            setTimeout(() => {
                this.props.retrievePets().then(() => {
                    this.state.toggle = !this.state.toggle;
                    this.setState(this.state);
                    makeToast(Toasts.Successful.EditPet);
                });
            }, waitToUpdateTime);
        }
    };

    constructor(props) {
        super(props);
        this.deletePet = this.deletePet.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.toggleAllEditingToFalse = this.toggleAllEditingToFalse.bind(this);
        this.editPet = this.editPet.bind(this);
        this.submitPet = this.submitPet.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.fetchPets = this.fetchPets.bind(this);

        this.state = {
            pet_sex: null,
            pet_size: null,
            hasLoaded: false,
            toggle: false,
        };

        this.props.retrievePets().then(() => {
            this.state.hasLoaded = true;
            this.state.toggle = !this.state.toggle;
            this.setState(this.state);
        });
        this.fetchPets();
    }

    fetchPets() {
        if (toast.isActive(Toasts.Info.AddPet.id)) {
            this.props.retrievePets().then(() => {
                this.state.toggle = !this.state.toggle;
                this.setState(this.state);
            });
        }
        setTimeout(() => this.fetchPets(), 2500);
    }

    toggleAllEditingToFalse() {
        // Ensure no other pet is editing at the same time
        if (_.isDefined(this.props.pets) && _.isArray(this.props.pets) && this.props.pets.length !== 0) {
            this.props.pets.forEach(pet => {
                if (pet != null && pet.editing == true) {
                    pet.editing = false;
                }
            });
        }

        this.state.toggle = !this.state.toggle;
        this.setState(this.state);
    }

    resetForm() {
        this.props.dispatch(ReduxForm.reset('editPet'));
        this.state.pet_size = this.state.pet_sex = null;
        this.setState(this.state);
    }

    render() {
        let {handleSubmit, submitting} = this.props;

        let parent = this;

        return (
            <div>
                {this.state.hasLoaded?
                    <div>
                        {_.isDefined(this.props.pets) && this.props.pets.length !== 0?
                            <div className="d-md-flex flex-md-wrap justify-content-md-start">
                                {this.props.pets.map(pet => (
                                    _.isDefined(pet) && _.isDefined(pet.pet_name) &&
                                    <div key={pet.pet_name + '_' + pet.id} className="card m-md-3">
                                        <form name={'editPet'}
                                              onSubmit={handleSubmit(form => parent.submitPet(form, pet))}>
                                            <div className="card-header">
                                                {pet.editing === true &&
                                                <div className="negative-bottom">
                                                    <Field name="pet_name" friendlyName="Pet Name"
                                                           placeholder={pet.pet_name == null? 'Fido' : pet.pet_name}
                                                           validators={[Validation.safeValidator]}/>
                                                </div>
                                                }
                                                {pet.editing === false &&
                                                <div>
                                                    <span className="text-muted">Pet Name: </span>{pet.pet_name}
                                                </div>
                                                }
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    {pet.editing === true &&
                                                    <div className="negative-bottom">
                                                        <Field name="pet_species" friendlyName="Pet Species"
                                                               placeholder={pet.pet_species == null? 'Dog' : pet.pet_species}
                                                               validators={[Validation.safeValidator]}/>
                                                    </div>
                                                    }
                                                    {pet.editing === false &&
                                                    <div>
                                                        <span className="text-muted">Species: </span>{pet.pet_species}
                                                    </div>
                                                    }
                                                </li>
                                                <li className="list-group-item container-fluid">
                                                    {pet.editing === true &&
                                                    <span className="row align-content-center">
                                                            <label className={'col-4 d-inline-block'}>Pet Size</label>
                                                            <Select name="pet_size" decorated={false} stacked={false}
                                                                    className={'col-8 d-inline-block'}
                                                                    friendlyName="Pet Size" placeholder="Small"
                                                                    validators={[Validation.safeValidator]}
                                                                    options={sizeOptions} value={this.state.pet_size}
                                                                    onChange={opt => this.handleSizeChange(opt)}/>
                                                        </span>
                                                    }
                                                    {pet.editing === false &&
                                                    <div>
                                                        <span className="text-muted">Size: </span>{pet.pet_size}
                                                    </div>
                                                    }
                                                </li>
                                                <li className="list-group-item container-fluid">
                                                    {pet.editing === true &&
                                                    <span className="row align-content-center">
                                                        <label className="col-4 d-inline-block">Pet Sex</label>
                                                        <Select name="pet_sex"
                                                                className="col-8 d-inline-block"
                                                                friendlyName="Pet Sex" placeholder="Male"
                                                                validators={[Validation.requiredValidator, Validation.safeValidator]}
                                                                options={sexOptions} value={this.state.pet_sex}
                                                                onChange={opt => this.handleSexChange(opt)}/>
                                                        </span>
                                                    }
                                                    {pet.editing === false &&
                                                    <div>
                                                        <span className="text-muted">Sex: </span>{pet.pet_sex}
                                                    </div>
                                                    }
                                                </li>
                                                <li className="list-group-item">
                                                    {pet.editing === true &&
                                                    <div className="negative-bottom">
                                                        <Field name="pet_age" friendlyName="Pet Age" decorated={false}
                                                               stacked={false}
                                                               placeholder={pet.pet_age == null? '4' : pet.pet_age}
                                                               validators={[Validation.safeValidator, Validation.numberValidator]}/>
                                                    </div>
                                                    }
                                                    {pet.editing === false &&
                                                    <div>
                                                        <span className="text-muted">Age: </span>{pet.pet_age}
                                                    </div>
                                                    }
                                                </li>
                                                <li className="list-group-item">
                                                    {pet.editing === true &&
                                                    <div className="negative-bottom">
                                                        <Field name="pet_info" friendlyName="Pet Info" decorated={false}
                                                               stacked={false}
                                                               placeholder={pet.pet_info == null? 'Additional pet information here.' : pet.pet_info}
                                                               validators={[Validation.safeValidator]}/>
                                                    </div>
                                                    }
                                                    {pet.editing === false &&
                                                    <div>
                                                        <span className="text-muted">Info: </span>{pet.pet_info}
                                                    </div>
                                                    }
                                                </li>
                                            </ul>

                                            <div style={{textAlign: 'center', marginTop: 10}}>
                                                {pet.editing === false &&
                                                <div>
                                                    <button type={'button'} className="btn btn-danger btn-sm"
                                                            style={{width: 'auto', margin: 10}}
                                                            onClick={(e) => {
                                                                parent.deletePet(e, pet.id);
                                                            }}>
                                                        Delete Pet
                                                    </button>
                                                    <button type={'button'} className="btn btn-primary btn-sm"
                                                            style={{width: 'auto', margin: 10}}
                                                            onClick={(e) => {
                                                                parent.editPet(e, pet);
                                                            }}>
                                                        Edit Pet
                                                    </button>
                                                </div>
                                                }
                                                {pet.editing === true &&
                                                <Button className="btn btn-success btn-sm" style={{width: 'auto'}}
                                                        loading={submitting}>Done Editing Pet</Button>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                ))
                                }
                            </div>
                            :
                            <p>No pets.</p>
                        }
                    </div>
                    :
                    <Loading/>
                }
            </div>
        );
    }
}

PetList = ReduxForm.reduxForm({form: 'editPet', touchOnChange: false, touchOnBlur: false})(PetList);

PetList = connect(
    state => ({
        pets: Users.State.getPets(state),
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        retrievePets: () => dispatch(Users.Actions.retrievePets()),
        deletePet: pet => dispatch(Users.Actions.deletePet(pet)),
    })
)(PetList);

export default PetList;
