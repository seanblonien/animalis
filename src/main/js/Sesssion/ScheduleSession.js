import React from 'react';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import Redirect from 'react-router-dom/es/Redirect';
import {sessionTypes} from 'js/Sesssion/SessionTypes';

export const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd; //today = mm+'-'+dd+'-'+yyyy;
    return today; //new Date().toJSON().slice(0,10);
};

class ScheduleSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedItems: new Map(),
			sessionType: null,
			unselectedPets: [],
			selectedPets: [],
			submitSuccessful: false,
		};
		this.props.retrievePets();

		setTimeout(() => {
            if(_.isDefined(this.props.pets) && !_.isEmpty(this.props.pets)){
            this.props.pets.map(pet => {
                this.state.unselectedPets.push(pet);
            });
            this.forceUpdate();
            }
        }, 1500);

		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	onSubmit = session => {
		session.id = Math.round(Date.now() + Math.random());
		session.ownerPrincipal = this.props.user.principal;
		session.sitterPrincipal = '';
		session.isComplete = false;
		session.sessionType = this.state.sessionType;
		session.pets = [];
		if (session.maxDistance == null) session.maxDistance = null;
		if (session.notes == null) session.notes = '';
		console.log('Session keys: ' + Object.keys(session).join(', '));
		console.log('Session values: ' + Object.values(session).join(', '));

		this.props.scheduleSession(session);

		this.state.submitSuccessful = true;
	};

	handleSessionTypeChange(e) {
		if (e != null) {
			this.state.sessionType = e;
			this.forceUpdate();
		}
	}

	handleCheckboxChange(e) {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
	}

	selectPet(e, pet) {
		e.preventDefault();
		this.state.selectedPets.push(pet);
		let index = this.state.unselectedPets.indexOf(pet);
		if (index > -1) {
			this.state.unselectedPets.splice(index, 1);
		}
		this.forceUpdate();
	}

	unselectPet(e, pet) {
		e.preventDefault();
		this.state.unselectedPets.push(pet);
		let index = this.state.selectedPets.indexOf(pet);
		if (index > -1) {
			this.state.selectedPets.splice(index, 1);
		}
		this.forceUpdate();
	}

	render() {
		let {handleSubmit, submitting} = this.props;

		if(this.state.submitSuccessful) {
			console.info('Redirecting after successful submission.');
			return <Redirect to='/'/>;
		}

		return (
			<div>
				{_.isEmpty(this.props.pets) &&
					<div>
						<p>Please add a pet before scheduling a session!</p>

						<p>You can add pets within the <a className="link" href="/#/editprofile">Profile</a> page.</p>
					</div>
				}
				{!_.isEmpty(this.props.pets) && this.props.pets.length > 0 &&
					<form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))}>
						<Bessemer.Field name="startDate" friendlyName="Start Date"
										validators={[Validation.requiredValidator]}
										field={<input type="date"
													  min={getCurrentDate()}
													  className={'form-control'}/>}/>

						<Bessemer.Field name="startTime" friendlyName="Start Time"
										validators={[Validation.requiredValidator]}
										field={<input type="time"
													  className={'form-control'}/>}/>

						<Bessemer.Field name="endDate" friendlyName="End Date"
										validators={[Validation.requiredValidator]}
										field={<input type="date"
													  min={getCurrentDate()}
													  className={'form-control'}/>}/>

						<Bessemer.Field name="endTime" friendlyName="End Time"
										validators={[Validation.requiredValidator]}
										field={<input type="time"
													  className={'form-control'}/>}/>

						<label>Session Service</label>
						<Bessemer.Select style={{marginBottom: '2.5%'}} name="session_type"
										 label={'Session Type'}
										 friendlyName="Session Type" placeholder={sessionTypes[0].label}
										 validators={[Validation.requiredValidator, Validation.safeValidator]}
										 options={sessionTypes} value={this.state.sessionType}
										 onChange={opt => this.handleSessionTypeChange(opt)}/>

						{/*<label>Location of Sitting:</label>

						<Bessemer.Field name={'ownerLocation'} friendlyName={'My address'}
										onChange={this.handleCheckboxChange}
										field={<input type="checkbox" value={this.state.checkedItems.get('ownerLocation')} />} />

						<Bessemer.Field name={'sitterLocation'} friendlyName={'Sitter\'s address'}
										onChange={this.handleCheckboxChange}
										field={<input type="checkbox" value={this.state.checkedItems.get('sitterLocation')} />} />*/}

						{this.state.checkedItems.get('sitterLocation') ?
							<Bessemer.Field name="maxDistance" friendlyName="Maximum distance away (miles)"
											placeholder="10" validators={[Validation.requiredValidator]}/> : null}

						<h5>Select Pets for this Session</h5>
						<h6>Available Pets</h6>
						{_.isEmpty(this.state.unselectedPets) &&
							<p>No pets available!</p>
						}
						{this.state.unselectedPets !== null && this.state.unselectedPets.map(pet => (
							_.isDefined(pet) && _.isDefined(pet.pet_name) &&
							<div key={pet.pet_name + '_' + pet.id} className="card" style={{width: '20rem', marginBottom: 10}}>
								<div style={{display: 'inline'}}>
									<img height={50} width={50} src={'data:image/png;base64,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'}/>
									<div className="d-inline ml-3">
										<span className="text-muted">Pet Name: </span>{pet.pet_name}
										<button className={'btn btn-success ml-3'}
												onClick={(e) => {this.selectPet(e, pet);}}>Select</button>
									</div>
								</div>
							</div>
						))}

						<h6>Currently Selected Pets</h6>
						{_.isEmpty(this.state.selectedPets) &&
							<p>No pets selected!</p>
						}
						{this.state.selectedPets != null &&
							<div>
								{this.state.selectedPets.map(pet => (
									_.isDefined(pet) && _.isDefined(pet.pet_name) &&
									<div key={pet.pet_name + '_' + pet.id} className="card" style={{width: '20rem', marginBottom: 10}}>
										<div style={{display: 'inline'}}>
											<img height={50} width={50} src={'data:image/png;base64,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'}/>
											<div className="d-inline ml-3">
												<span className="text-muted">Pet Name: {pet.pet_name}</span>
												<button className={'btn btn-light ml-3'}
														onClick={(e) => {this.unselectPet(e, pet);}}>Unselect</button>
											</div>
										</div>
									</div>
								))}
							</div>
						}

						<Bessemer.Field name="notes" friendlyName="Notes" placeholder="Special Instructions"/>

						<Bessemer.Button loading={submitting}>Add Session</Bessemer.Button>
					</form>
				}
			</div>
		);
	}
}

ScheduleSession = ReduxForm.reduxForm({form: 'schedulesession'})(ScheduleSession);

ScheduleSession = connect(
	state => ({
		pets: Users.State.getPets(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		scheduleSession: session => dispatch(Users.Actions.scheduleSession(session)),
		retrievePets: () => dispatch(Users.Actions.retrieve()),
	})
)(ScheduleSession);

export default ScheduleSession;
