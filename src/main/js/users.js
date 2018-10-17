import axios from 'axios';
import Cookies from 'universal-cookie';

export function register(user) {
	return axios.post('/api/user/register', {
			principal: user.principal,
			password: user.password,
			fname: user.fname,
			lname: user.lname,
			phone: user.phone,
			street: user.street,
			city: user.city,
			state: user.state,
			zip: user.zip,
			petSitter: user.petSitter,
			petOwner: user.petOwner,
			emailNotifications: user.emailNotifications,
			pets: user.pets,
	});
}

export function scheduleSession(session, user) {
	return axios.post('/api/sessions', {

	});
}

export function deleteAccount(user) {
	console.log('Posting delete...');
    return axios.post('/api/user/delete', {
        principal: user.principal
    });
}

export function update(user) {
    return axios.post('/api/user/update', {
        principal: user.principal,
        password: user.password,
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        street: user.street,
        city: user.city,
        state: user.state,
        zip: user.zip,
        petSitter: user.petSitter,
        petOwner: user.petOwner,
        emailNotifications: user.emailNotifications,
        pets: user.pets,
    });
}

export function authenticate(username, password) {
	return axios(
		{
			method: 'post',
			url: '/oauth/token',
			params: {
				'grant_type': 'password',
				username,
				password
			},
			auth: {
				username: 'petfinder-app',
				password: 'petfinder-app-secret'
			}
		}
	);
}

export function deletePet(id) {
    return axios.post('/api/user/pet/delete/' + id);
}

export function addPetToUser(id) {
    return axios.post('/api/user/pet/' + id);
}

export function getPet(id) {
    return axios.post('/api/pets/' + id);
}

export function addpet(pet) {
	return axios.post('/api/pets', {
		id: pet.id,
		pet_name: pet.pet_name,
		pet_species: pet.pet_species,
		pet_age: pet.pet_age,
		pet_size: pet.pet_size,
		pet_sex: pet.pet_sex,
		pet_info: pet.pet_info,
	});
}

export function updatePet(pet) {
    return axios.post('/api/pets/update/', {
        id: pet.id,
        pet_name: pet.pet_name,
        pet_species: pet.pet_species,
        pet_age: pet.pet_age,
        pet_size: pet.pet_size,
        pet_sex: pet.pet_sex,
        pet_info: pet.pet_info,
	});
}

export function getPets(){
	return axios.get('/api/user/pet');
}

export function getUserDetails() {
	return axios.get('/api/user');
}

let State = {};

State.getAuthentication = state => {
	return state.authentication;
};

State.getUser = state => {
	return state.user;
};

State.getPets = state => {
	return state.pets;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PETS: 'SET_PETS'
};

Actions.retrieve = () => {
    return (dispatch) => {
        return getPets().then(pets => {
            return dispatch(Actions.setPets(pets));
        });
    };
};

Actions.addPetToUser = id => {
    return (dispatch) =>  {
        return addPetToUser(id).then(() => {
            return getPets().then(pets => {
                return dispatch(Actions.setPets(pets));
            });
        });
    };
};

Actions.deletePet = id => {
    return (dispatch) =>  {
        return deletePet(id).then(() => {
            return getPets().then(pets => {
                return dispatch(Actions.setPets(pets));
            });
        });
    };
};

Actions.addpet = pet => {
	return (dispatch) =>  {
		return addpet(pet).then(() => {
			return getPets().then(pets => {
				return dispatch(Actions.setPets(pets));
			});
		});
    };
};

Actions.updatePet = pet => {
    return (dispatch) =>  {
        return updatePet(pet).then(() => {
            return getPets().then(pets => {
                return dispatch(Actions.setPets(pets));
            });
        });
    };
};

Actions.deleteAccount = user => {
    return (dispatch) => {
        // Delete the user account on the server
        return deleteAccount(user).then(() => {
            // Logout the user after removed
            return dispatch(Actions.logout());
        });
    };
};

Actions.update = user => {
    return (dispatch) => {
        // Update the user details on the server
        return update(user).then(() => {
            // Authenticate the user modified user
            return dispatch(Actions.authenticate(user.principal, user.password));
        });
    };
};

Actions.register = user => {
	return (dispatch) => {
		// Register the user with the server (make account on the server)
		return register(user).then(() => {
			// Authenticate the user with the newly created account
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.authenticate = (username, password) => {
	return (dispatch) => {
		// First authenticate the user with the server
		return authenticate(username, password).then(authentication => {
				// Save the authentication key from the returned promise in a state
				dispatch(Actions.setAuthentication(authentication));
				// Get the user details after authentication
				return getUserDetails().then(user => {
					// Save the user details from the returned promise in a state
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.logout = () => {
	return (dispatch) => {
		// Reset all User Action states
		dispatch(Actions.setAuthentication(null));
		dispatch(Actions.setUser(null));
        dispatch(Actions.setPets(null));
		const cookies = new Cookies();
		cookies.remove('authentication');
		cookies.remove('user');
	};
};

Actions.setAuthentication = authentication => {
	// Set authentication cookie
	const cookies = new Cookies();
	cookies.set('authentication', authentication, { path: '/' });
	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
	// Set user cookie
	const cookies = new Cookies();
	cookies.set('user', user, { path: '/' });
	return {type: Actions.Types.SET_USER, user};
};

Actions.setPets = pets => {
	if(pets != null) {
		pets.forEach(pet => {
			if(pet == null) return;
			pet.editing = false;
			console.log('Updating editing values for pet '+ pet.name);
		});
	}
	return {type: Actions.Types.SET_PETS, pets};
};

export { Actions };

let Reducers = {};

Reducers.authentication = (authentication = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_AUTHENTICATION: {
			return action.authentication;
		}
		default: {
			return authentication;
		}
	}
};

Reducers.user = (user = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_USER: {
			return action.user;
		}
		default: {
			return user;
		}
	}
};

Reducers.pets = (pets = [], action) => {
	switch (action.type) {
		case Actions.Types.SET_PETS: {
			return action.pets;
		}
		default: {
			return pets;
		}
	}
};

export { Reducers };