import axios from 'axios';
import Cookies from 'universal-cookie';
import { makeToast, Toasts as Toast, Toasts } from 'js/Common/Toasts';

 /* Authentication */
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
    ).catch(error => handleHTTPError(error));
}

export function confirmPassword(password) {
    return axios.get('/api/user/confirmPassword/' + password).catch(error => handleHTTPError(error));
}

/* Account creation and deletion */

export function deleteAccount() {
    return axios.post('/api/user/delete').catch(error => handleHTTPError(error));
}

export function register(user) {
    return axios.post('/api/user/register', user).catch(error => handleHTTPError(error));
}

/* MailGun related email calls */
export function sendEmailRegister() {
    // For emails when user registers their account
    return axios.post('/api/user/sendEmailRegister').catch(error => handleHTTPError(error));
}

export function sendEmailPost() {
    // For emails when a sitter bids on a owner's post
    return axios.post('/api/user/sendEmailPost').catch(error => handleHTTPError(error));
}

/* Getters for user objects */
export function getPublicUser(principal) {
    principal = principal.replace('@', '%40').replace('.', '*');
    return axios.get('/api/user/public/' + principal).catch(error => handleHTTPError(error));
}

export function getUserDetails() {
    return axios.get('/api/user').catch(error => handleHTTPError(error));
}

export function getPets() {
    return axios.get('/api/user/pet').catch(error => handleHTTPError(error));
}

export function getSessions() {
    return axios.get('/api/user/sessions').catch(error => handleHTTPError(error));
}

export function getAllSessions(sessionQueryObj) {
    return axios.get('/api/sessions/all', sessionQueryObj).catch(error => handleHTTPError(error));
}

export function getNotifications() {
    return axios.get('/api/user/notifications').catch(error => handleHTTPError(error));
}

export function getRatings() {
    return axios.get('/api/user/ratings');
}

export function updateUser(user) {
    return axios.post('/api/user/update', user).catch(error => handleHTTPError(error));
}

/* Add new item to a user object  */
export function addPet(pet) {
    // Add this new pet to the pets index
    console.log(JSON.stringify(pet));
    return axios.post('/api/pets', pet).then(() => {
        // Add the pet ID to the users pet list
        return axios.post('/api/user/pet/' + pet.id);
    }).catch(error => handleHTTPError(error));
}

export function addSession(session) {
    // Add all session data to session index
    console.log(JSON.stringify(session));
    return axios.post('/api/sessions/', session).then(() => {
        console.log('Adding session ID to user');
        // Add session ID to user
        return axios.post('/api/user/sessions/' + session.id);
    }).catch(error => handleHTTPError(error));
}

export function addNotification(notification) {
    // Add this new notification to the notifications index
    return axios.post('/api/notifications', notification).catch(error => handleHTTPError(error));
}

export function addRating(rating) {
    return axios.post('/api/ratings', rating).catch(error => handleHTTPError(error));
}

/* Update user objects */
export function updateNotification(notification) {
    // Add this new notification to the notifications index
    return axios.post('/api/notifications/update', notification).catch(error => handleHTTPError(error));
}

export function updatePet(pet) {
    return axios.post('/api/pets/update/', pet).catch(error => handleHTTPError(error));
}

export function updateSession(session) {
    return axios.post('/api/sessions/update', session).catch(error => handleHTTPError(error));
}

export function updateRating(rating) {
    return axios.post('/api/ratings/update', rating).catch(error => handleHTTPError(error));
}

/* Delete/remove user objects */
export function deletePet(id) {
    // Delete the pet from the pets index using a pet id
    return axios.post('/api/pets/delete/' + id).then(() => {
        // Delete the pet from the users pet list
        return axios.post('/api/user/pet/delete/' + id);
    }).catch(error => handleHTTPError(error));

}

export function deleteSession(id) {
    // Remove session from session index
    return axios.post('/api/sessions/delete/' + id).then(() => {
        // Remove session ID from users session list
        return axios.post('/api/user/sessions/delete/' + id);
    }).catch(error => handleHTTPError(error));
}

export function deleteNotification(id) {
    // Remove notification from notifications index
    return axios.post('/api/notifications/delete/' + id).then(() => {
        // Remove notification ID from users notification list
        return axios.post('/api/user/notifications/delete/' + id);
    }).catch(error => handleHTTPError(error));
}

export function deleteRating(id) {
    return axios.post('/api/ratings/delete/' + id).then(() => {
        // Remove notification ID from users notification list
        return axios.post('/api/user/notifications/delete/' + id);
    }).catch(error => handleHTTPError(error));
}

export function cancelSession(id){
    return axios.post('/api/sessions/cancel/' + id).catch(error => handleHTTPError(error));
}

/* Error handler for API calls and HTTP requests */
const handleHTTPError = error => {
    if (error.response) {
        const cookies = new Cookies();
        switch (error.response.status) {
            case 400: {
                cookies.remove('authentication');
                cookies.remove('user');
                //console.error(error.response.data.error + '\n');
                let a = document.createElement('a');
                window.location.href = a.origin + /#/;
                makeToast(Toasts.Unsuccessful.AuthenticationError, error.response.data.error);
                break;
            }
            case 401: {
                cookies.remove('authentication');
                cookies.remove('user');
                //console.error(error.response.data.error + '\n');
                let a = document.createElement('a');
                window.location.href = a.origin + /#/;
                makeToast(Toasts.Unsuccessful.Login, error.response.data.error);
                break;
            }
            default: {
                makeToast(Toasts.Unsuccessful.Error, error.response.data.error);
                break;
            }
        }
    }
    return null;
};

/* Getter functions for the user state */
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

State.getRatings = state => {
    return state.ratings;
};

export { State };

/* Actions functions for the user state */
let Actions = {};

/* Types of user actions */
Actions.Types = {
    SET_AUTHENTICATION: 'SET_AUTHENTICATION',
    SET_USER: 'SET_USER',
    SET_PETS: 'SET_PETS',
    SET_SESSIONS: 'SET_SESSIONS',
    SET_ALL_SESSIONS: 'SET_ALL_SESSIONS',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    SET_RATINGS: 'SET_RATINGS',
};

/* Current user authentication controls */
Actions.authenticate = (username, password) => {
    return (dispatch) => {
        // First authenticate the user with the server
        return authenticate(username, password).then(authentication => {
                makeToast(Toasts.Successful.Login);
                // Save the authentication key from the returned promise in a state
                dispatch(Actions.setAuthentication(authentication));
                // Get the user details after authentication
                return dispatch(Actions.fetchUser());
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

Actions.deleteAccount = user => {
    return (dispatch) => {
        // Delete the user account on the server
        return deleteAccount(user).then(() => {
            // Logout the user after removed
            return dispatch(Actions.logout());
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

/* Fetchers that will get some user objects and set them accordingly */
Actions.fetchUser = () => {
    return (dispatch) => {
        return getUserDetails().then(user => {
            return dispatch(Actions.setUser(user));
        });
    };
};

Actions.fetchPets = () => {
    return (dispatch) => {
        return getPets().then(pets => {
            return dispatch(Actions.setPets(pets));
        });
    };
};

Actions.fetchSessions = () => {
    return (dispatch) => {
        return getSessions().then(sessions => {
            return dispatch(Actions.setSessions(sessions));
        });
    };
};

Actions.fetchAllSessions = () => {
    return (dispatch) => {
        return getAllSessions().then(allSessions => {
            return dispatch(Actions.setAllSessions(allSessions));
        });
    };
};

Actions.fetchNotifications = () => {
    return (dispatch) => {
        return getNotifications().then(notifications => {
            return dispatch(Actions.setNotifications(notifications));
        });
    };
};

Actions.fetchRatings = () => {
    return (dispatch) => {
        return getRatings().then(ratings => {
            return dispatch(Actions.setRatings(ratings));
        });
    };
};

/* User object updaters */
Actions.updateSession = (session) => {
    return (dispatch) => {
        return updateSession(session).then(() => {
            return getSessions().then(sessions => {
                return dispatch(Actions.setSessions(sessions));
            });
        });
    };
};

Actions.updateNotification = notification => {
    return (dispatch) => {
        return updateNotification(notification).then(() => {
            return getNotifications().then(notifications => {
                return dispatch(Actions.setNotifications(notifications));
            });
        });
    };
};

/* Actions that add an item to the user */
Actions.addSession = (session) => {
    return (dispatch) => {
        return addSession(session).then(() => {
            makeToast(Toasts.Successful.ScheduleSession);
            return getSessions().then(sessions => {
                return dispatch(Actions.setSessions(sessions));
            });
        });
    };
};

Actions.addPet = pet => {
    return (dispatch) => {
        return addPet(pet).then(() => {
            makeToast(Toasts.Info.AddPet);
            return dispatch(Actions.fetchPets());
        });
    };
};

Actions.addNotification = notification => {
    return (dispatch) => {
        return addNotification(notification).then(() => {
            makeToast(Toasts.Info.AddNotification);
            return dispatch(Actions.fetchNotifications()).then(notifications => {
                return dispatch(Actions.setNotifications(notifications));
            });
        });
    };
};

/* Actions that deletes items for the user's */
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

/* Actions that will set the user's object states */
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
            if (pets[pet] != null) pets[pet].editing = false;
        }
    }
    return {type: Actions.Types.SET_PETS, pets};
};

Actions.setSessions = sessions => {
    return {type: Actions.Types.SET_SESSIONS, sessions};
};

Actions.setAllSessions = allSessions => {
    return {type: Actions.Types.SET_ALL_SESSIONS, allSessions};
};

Actions.setNotifications = notifications => {
    return {type: Actions.Types.SET_NOTIFICATIONS, notifications};
};

Actions.setRatings = ratings => {
    return {type: Actions.Types.SET_RATINGS, ratings};
};

export { Actions };


/* Redux reducers for the user actions used when updating the redux store */
let Reducers = {};

Reducers.authentication = (authentication = null, action) => {
    return action.type === Actions.Types.SET_AUTHENTICATION? (action.authentication) : authentication;
};

Reducers.user = (user = null, action) => {
    return action.type === Actions.Types.SET_USER? (action.user) : user;
};

Reducers.pets = (pets = [], action) => {
    return action.type === Actions.Types.SET_PETS? (action.pets) : pets;
};

Reducers.sessions = (sessions = [], action) => {
    return action.type === Actions.Types.SET_SESSIONS? (action.sessions) : sessions;
};

Reducers.allSessions = (allSessions = [], action) => {
    return action.type === Actions.Types.SET_ALL_SESSIONS? (action.allSessions) : allSessions;
};

Reducers.notifications = (notifications = [], action) => {
    return action.type === Actions.Types.SET_NOTIFICATIONS? (action.notifications) : notifications;
};

export { Reducers };
