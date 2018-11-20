import axios from 'axios';
import Cookies from 'universal-cookie';
import {makeToast, Toasts as Toast, Toasts} from 'js/Common/Toasts';

export function register(user) {
    return axios.post('/api/user/register', user);
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

export function confirmPassword(password) {
    return axios.get('/api/user/confirmPassword/' + password);
}

export function deletePet(id) {
    // Delete the pet from the pets index using a pet id
    return axios.post('/api/pets/delete/' + id).then(() => {
        // Delete the pet from the users pet list
        return axios.post('/api/user/pet/delete/' + id);
    });

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

export function addNotification(notification) {
    // Add this new notification to the notifications index
    return axios.post('/api/notifications', notification).catch((e) => {
        console.log('Error adding notification! \n' + e);
        return [];
    });
}

export function updateNotification(notification) {
    // Add this new notification to the notifications index
    return axios.post('/api/notifications/update', notification).catch((e) => {
        console.log('Error updating notification! \n' + e);
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

export function getNotifications() {
    return axios.get('/api/user/notifications').catch((e) => {
        console.log('Error getting user notifications. \n' + e);
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

export function deleteNotification(id) {
    // Remove notification from notifications index
    return axios.post('/api/notifications/delete/' + id).then(() => {
        // Remove notification ID from users notification list
        return axios.post('/api/user/notifications/delete/' + id);
    });
}

export function getPublicUser(principal) {
    principal = principal.replace('@', '%40').replace('.', '*');
    return axios.get('/api/user/public/' + principal);
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

State.getNotifications = state => {
    return state.notifications;
};

export {State};

let Actions = {};

Actions.Types = {
    SET_AUTHENTICATION: 'SET_AUTHENTICATION',
    SET_USER: 'SET_USER',
    SET_PETS: 'SET_PETS',
    SET_SESSIONS: 'SET_SESSIONS',
    SET_ALL_SESSIONS: 'SET_ALL_SESSIONS',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
};

Actions.getSessions = () => {
    return (dispatch) => {
        return getSessions().then(sessions => {
            return dispatch(Actions.setSessions(sessions));
        });
    };
};

Actions.getAllSessions = () => {
    return (dispatch) => {
        return getAllSessions().then(allSessions => {
            return dispatch(Actions.setAllSessions(allSessions));
        });
    };
};

Actions.getNotifications = () => {
    return (dispatch) => {
        return getNotifications().then(notifications => {
            return dispatch(Actions.setNotifications(notifications));
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
        return addSession(session).then(() => {
            makeToast(Toasts.Successful.ScheduleSession);
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

Actions.deleteNotification = (id) => {
    return (dispatch) => {
        return deleteNotification(id).then(() => {
            return getNotifications().then(sessions => {
                return dispatch(Actions.setNotifications(sessions));
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
            makeToast(Toasts.Info.AddPet);
            return dispatch(Actions.retrieve());
        });
    };
};

Actions.addNotification = notification => {
    return (dispatch) => {
        return addNotification(notification).then(() => {
            makeToast(Toasts.Info.AddNotification);
            return dispatch(Actions.getNotifications()).then(notifications => {
                return dispatch(Actions.setNotifications(notifications));
            });
        });
    };
};

Actions.updateNotification = notification => {
    return (dispatch) => {
        return updateNotification(notification).then(() => {
            return dispatch(Actions.getNotifications()).then(notifications => {
                return dispatch(Actions.setNotifications(notifications));
            });
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

Actions.updateUser = user => {
    return (dispatch) => {
        // Update the user details on the server
        return update(user).then(() => {
            makeToast(Toasts.Successful.ProfileUpdate);
            location.reload();
            // Refresh the user details after update
            return dispatch(Actions.refreshUser());
        });
    };
};

Actions.register = user => {
    return (dispatch) => {
        // Register the user with the server (make account on the server)
        return register(user).then(() => {
            // Authenticate the user with the newly created account
            return dispatch(Actions.authenticate(user.principal, user.password)).then(() => {
                makeToast(Toasts.Successful.Register);
                // Sends current user an email about registering as a certain user
                return sendEmailRegister().then(() => {
                    makeToast(Toasts.Info.RegisterEmailSent);
                });
            });
        });
    };
};

Actions.refreshUser = () => {
    return (dispatch) => {
        return getUserDetails().then(user => {
            // Save the user details from the returned promise in a state
            return dispatch(Actions.setUser(user));
        }).catch(error => {
            if(error.response.status == 401) {
                dispatch(Actions.logout());
                console.error(error.response.data.error + '\n');
                let a = document.createElement('a');
                window.location.href = a.origin + /#/;
                makeToast(Toasts.Unsuccessful.Login);
            }
        });
    };
};

Actions.authenticate = (username, password) => {
    return (dispatch) => {
        // First authenticate the user with the server
        return authenticate(username, password).then(authentication => {
                makeToast(Toasts.Successful.Login);
                // Save the authentication key from the returned promise in a state
                dispatch(Actions.setAuthentication(authentication));
                // Get the user details after authentication
                return dispatch(Actions.refreshUser());
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
        dispatch(Actions.setNotifications(null));
        const cookies = new Cookies();
        cookies.remove('authentication');
        cookies.remove('user');
        makeToast(Toast.Info.Logout);
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

Actions.setNotifications = notifications => {
    return {type: Actions.Types.SET_NOTIFICATIONS, notifications};
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

Reducers.notifications = (notifications = [], action) => {
    switch (action.type) {
        case Actions.Types.SET_NOTIFICATIONS: {
            return action.notifications;
        }
        default: {
            return notifications;
        }
    }
};

export {Reducers};
