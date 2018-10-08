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
			emailNotifications: user.emailNotifications
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

export function addpet(pet) {
	return axios.post('/api/user/pet', {
		petId: pet.petId,
		userPrincipal: pet.userPrincipal,
		pet_name: pet.petname,
		pet_species: pet.petspecies,
		pet_age: pet.petage,
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

Actions.addpet = pet => {
	return (dispatch) =>  {
		return addpet(pet).then(() => {
			return getPets(pet).then(pets => {
				return dispatch(Actions.setPets(pets));
			});
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