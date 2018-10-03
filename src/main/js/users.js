import axios from 'axios';

export function register(user) {
	// return axios.post('/api/user/register', user);
    return axios.post('/api/user/register', {
    		principal: user.principal,
			password: user.password,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            address: user.address,
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
		id: pet.id,
		petId: pet.petId,
		userPrincipal: pet.userPrincipal,
		pet_name: pet.pet_name,
		pet_species: pet.pet_species
	}).then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
}

export function displayPets(){
	return axios.get('/api/user/pet').then(function (response) {
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
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

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	ADD_PET: 'ADD_PET'
};

Actions.addpet = pet => {
	return (dispatch) => {
		return addpet(pet).then((addedpet)  => {
			return dispatch(Actions.setPet(addedpet));
		});
	};
};

Actions.register = user => {
	return (dispatch) => {
		return register(user).then(() => {
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.authenticate = (username, password) => {
	return (dispatch) => {
		return authenticate(username, password).then(
			authentication => {
				dispatch(Actions.setAuthentication(authentication));

				return getUserDetails().then(user => {
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.logout = () => {
	return (dispatch) => {
		dispatch(Actions.setAuthentication(null));
		dispatch(Actions.setUser(null));
		dispatch(Actions.setPet(null));
	};
};

Actions.setPet = pet => {
	return{type: Actions.Types.ADD_PET, pet};
};

Actions.setAuthentication = authentication => {
	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
	return {type: Actions.Types.SET_USER, user};
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

Reducers.pet = (pet = null, action) => {
	switch (action.type) {
		case Actions.Types.ADD_PET: {
			return action.pet;
		}
		default: {
			return pet;
		}
	}
};

export { Reducers };