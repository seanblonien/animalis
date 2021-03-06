import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import axios from 'axios';
import Index from 'js/Common/index';
import * as Users from 'js/User/Users';
import * as Utils from 'js/alloy/utils/core-utils';
import Cookies from 'universal-cookie';
import Bootstrap from 'bootstrap'; // DO NOT REMOVE THIS - IT IS NECESSARY TO LOAD
import 'styles/main.scss';

// Set our initial reducers for User actions
const reducers = [
    {form: formReducer},
    Users.Reducers
];
// Combine the reducers of the user actions for the store creation
const reducer = Utils.combineReducers(reducers);

// Initialize object to get cookies with
const cookies = new Cookies();

// Create the Redux store with the combined reducers, the cached authentication key and user values
const store = createStore(reducer, {
    authentication: cookies.get('authentication'),
    user: cookies.get('user'),
    pets: []
}, applyMiddleware(thunkMiddleware, createLogger()));

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    let authentication = Users.State.getAuthentication(store.getState());
    if (_.isDefined(authentication)) {
        request.headers.common['Authorization'] = 'Bearer ' + authentication['access_token'];
    }
    return request;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response.data, error => Promise.reject(error));

const mountNode = document.querySelector('#main');
ReactDOM.render(<Provider store={store}><Index/></Provider>, mountNode);
