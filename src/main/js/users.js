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
	console.log('POSTING PET');
	return axios.post('/api/user/pet', {
		petId: pet.petId,
		userPrincipal: pet.userPrincipal,
		pet_name: pet.petname,
		pet_species: pet.petspecies,
		pet_age: pet.petage,
	}).then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
}

export function getPets(){
	console.log('GETTING PET');
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
    console.log('=====');
	console.log('IN ACTIONS');
    console.log('Keys: ' + Object.keys(pet));
	console.log('=====');
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
		return register(user).then(() => {
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.authenticate = (username, password) => {
	localStorage.setItem('name', username);
	localStorage.setItem('pass', password);
    localStorage.setItem('user', JSON.stringify(getUserDetails()));

	return (dispatch) => {
		let authh = authenticate(username, password);
        localStorage.setItem('auth', JSON.stringify(authh));
		return authh.then(
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
        dispatch(Actions.setPets(null));
	};
};

Actions.setAuthentication = authentication => {
	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
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

Reducers.pets = (pets = null, action) => {
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