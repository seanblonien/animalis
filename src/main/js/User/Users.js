import axios from 'axios';
import Cookies from 'universal-cookie';

export function register(user) {
	return axios.post('/api/user/register', user);
}

export function scheduleSession(session) {
	return axios.post('/api/sessions', session);
}

export function sendEmailRegister() {
	// For emails when user registers their account
	return axios.post('/api/user/sendEmailRegister');
}

export function sendEmailPost() {
	// For emails when a sitter bids on a owner's post
	return axios.post('/api/user/sendEmailPost');
}

export function deleteAccount(user) {
	console.log('Posting delete...');
	return axios.post('/api/user/delete', {
		principal: user.principal
	});
}

export function update(user) {
	return axios.post('/api/user/update', user);
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
	// Delete the pet from the pets index using a pet id
	return axios.post('/api/pets/delete/' + id).then(() => {
		// Delete the pet from the users pet list
		return axios.post('/api/user/pet/delete/' + id);
	});

}

export function getPet(id) {
	return axios.post('/api/pets/' + id);
}

export function addPet(pet) {
	// Add this new pet to the pets index
	console.log(JSON.stringify(pet));
	return axios.post('/api/pets', pet).then(() => {
		// Add the pet ID to the users pet list
		return axios.post('/api/user/pet/' + pet.id);
	}).catch((e) => {
		console.log('Error adding pet! \n' + e);
		return [];
	});
}

export function updatePet(pet) {
	return axios.post('/api/pets/update/', pet);
}

export function getPets() {
	return axios.get('/api/user/pet').catch((e) => {
		console.log('Error getting user pets. \n' + e);
		return [];
	});
}

export function getUserDetails() {
	return axios.get('/api/user');
}

export function getSessions() {
	return axios.get('/api/user/sessions').catch((e) => {
		console.log('Error getting user sessions. \n' + e);
		return [];
	});
}

export function getAllSessions(sessionQueryObj) {
	return axios.get('/api/sessions/all', sessionQueryObj);
}

export function updateSession(session) {
	return axios.post('/api/sessions/update', session);
}

export function addSession(session) {
	// Add all session data to session index
	console.log(JSON.stringify(session));
	return axios.post('/api/sessions/', session).then(() => {
		console.log('Adding session ID to user');
		// Add session ID to user
		return axios.post('/api/user/sessions/' + session.id);
	});
}

export function deleteSession(id) {
	// Remove session from session index
	return axios.post('/api/sessions/delete/' + id).then(() => {
		// Remove session ID from users session list
		return axios.post('/api/user/sessions/delete/' + id);
	});
}

export function getPublicUser(principal) {
    principal = principal.replace('@', '%40').replace('.', '*');
    return axios.get('/api/user/public/' + principal);/*.then((res) => {
    	//console.log('KEYS: ' + JSON.stringify(res));
    	return res;
	});*/
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

State.getSessions = state => {
	return state.sessions;
};

State.getAllSessions = state => {
	return state.allSessions;
};

export {State};

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PETS: 'SET_PETS',
	SET_SESSIONS: 'SET_SESSIONS',
	SET_ALL_SESSIONS: 'SET_ALL_SESSIONS',
};

Actions.getAllSessions = () => {
	return (dispatch) => {
		return getAllSessions().then(allSessions => {
			return dispatch(Actions.setAllSessions(allSessions));
		});
	};
};

Actions.updateSession = (session) => {
	return (dispatch) => {
		return updateSession(session).then(() => {
			return getSessions().then(sessions => {
				return dispatch(Actions.setSessions(sessions));
			});
		});
	};
};

Actions.scheduleSession = (session) => {
	return (dispatch) => {
		console.log('Calling add session API');
		return addSession(session).then(() => {
			return getSessions().then(sessions => {
				return dispatch(Actions.setSessions(sessions));
			});
		});
	};
};

Actions.deleteSession = (id) => {
	return (dispatch) => {
		return deleteSession(id).then(() => {
			return getSessions().then(sessions => {
				return dispatch(Actions.setSessions(sessions));
			});
		});
	};
};

Actions.retrieve = () => {
	return (dispatch) => {
		return getPets().then(pets => {
			return dispatch(Actions.setPets(pets));
		});
	};
};

Actions.deletePet = id => {
	return (dispatch) => {
		return deletePet(id).then(() => {
			return dispatch(Actions.retrieve());
		});
	};
};

Actions.addPet = pet => {
	return (dispatch) => {
		return addPet(pet).then(() => {
			return dispatch(Actions.retrieve());
		});
	};
};

Actions.updatePet = pet => {
	return (dispatch) => {
		return updatePet(pet).then(() => {
			return dispatch(Actions.retrieve());
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
			return dispatch(Actions.authenticate(user.principal, user.password)).then(() => {
				// Sends current user an email about registering as a certain user
				return sendEmailRegister();
			});
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
		dispatch(Actions.setSessions(null));
		dispatch(Actions.setAllSessions(null));
		const cookies = new Cookies();
		cookies.remove('authentication');
		cookies.remove('user');
	};
};

Actions.setAuthentication = authentication => {
	// Set authentication cookie
	const cookies = new Cookies();
	cookies.set('authentication', authentication, {path: '/'});
	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
	// Set user cookie
	const cookies = new Cookies();
	cookies.set('user', user, {path: '/'});
	return {type: Actions.Types.SET_USER, user};
};

Actions.setPets = pets => {
	if (pets != null) {
		for (let pet = 0; pet < pets.length; pet++) {
			if (pets[pet] == null) return;
			pets[pet].editing = false;
		}
	}
	return {type: Actions.Types.SET_PETS, pets};
};

Actions.setSessions = sessions => {
	// Set the user's sessions within the redux state
	return {type: Actions.Types.SET_SESSIONS, sessions};
};

Actions.setAllSessions = allSessions => {
	// Set all possible sessions within the redux state
	return {type: Actions.Types.SET_ALL_SESSIONS, allSessions};
};


export {Actions};

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

Reducers.sessions = (sessions = [], action) => {
	switch (action.type) {
		case Actions.Types.SET_SESSIONS: {
			return action.sessions;
		}
		default: {
			return sessions;
		}
	}
};

Reducers.allSessions = (allSessions = [], action) => {
	switch (action.type) {
		case Actions.Types.SET_ALL_SESSIONS: {
			return action.allSessions;
		}
		default: {
			return allSessions;
		}
	}
};

export {Reducers};