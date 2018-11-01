import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import {waitToUpdateTime} from 'js/Pet/PetList';

export const sexOptions = [
	{label: 'Male', value: 'Male'},
	{label: 'Female', value: 'Female'}
];

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
		pet.id = Math.round(Date.now() + Math.random());
		pet.pet_sex = this.state.pet_sex;
		console.log('Keys: ' + Object.keys(pet).join(', '));
		this.props.addPet(pet, this.forceUpdate);
		setTimeout(this.props.retrievePets, waitToUpdateTime);
	};

	handleSexChange = e => {
		if (e != null) {
			this.state.pet_sex = e;
			this.forceUpdate();
		}
	};

	render() {
		let {handleSubmit, submitting} = this.props;

		return (
			<div>
				<form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))} className={'form-group'}>
					<Bessemer.Field name="pet_name" friendlyName="Pet Name" placeholder="Fido"
									validators={[Validation.requiredValidator, Validation.safeValidator]}/>

					<Bessemer.Field name="pet_species" friendlyName="Pet Species" placeholder="Dog"
									validators={[Validation.requiredValidator, Validation.safeValidator]}/>

					<Bessemer.Field name="pet_size" friendlyName="Pet Size" placeholder="Medium"
									validators={[Validation.requiredValidator, Validation.safeValidator]}/>

					{/*<Bessemer.Field name="pet_sex" friendlyName="Pet Sex" placeholder="Male"*/}
					{/*validators={[Validation.requiredValidator, Validation.sexValidator]} />*/}

					{/*<Bessemer.Field name="pet_sex" friendlyName="Pet Sex" placeholder="Male"*/}
					{/*validators={[Validation.requiredValidator]}*/}
					{/*field={<input type="date"*/}
					{/*className={'form-control form-group'}/>} />*/}

					<span className={'row'} style={{verticalAlign: 'middle', width: '100%', marginBottom: 15}}>
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
		addPet: (pet) => dispatch(Users.Actions.addPet(pet)),
		retrievePets: () => dispatch(Users.Actions.retrieve()),
	})
)(AddPetForm);

export default AddPetForm;