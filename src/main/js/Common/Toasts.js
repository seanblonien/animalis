import {toast} from 'react-toastify';
import _ from 'lodash';

export const Toasts = {
    Successful: {
        Login: {
            id: 1,
            message: 'You are now logged in',
        },
        Register: {
            id: 2,
            message: 'Successfully registered',
        },
        ProfileUpdate: {
            id: 3,
            message: 'Successfully updated user profile',
        },
        ScheduleSession: {
            id: 8,
            message: 'Successfully scheduled a pet service session',
        },
    },
    Unsuccessful: {
        Login: {
            id: 4,
            message: 'Unable to login',
        },
        Register: {
            id: 5,
            message: 'Unable to register',
        },
    },
    Info: {
        Logout: {
            id: 6,
            message: 'Logged out',
        },
        RegisterEmailSent: {
            id: 7,
            message: 'You have been sent a welcome email for registering'
        },
        AddPet: {
            id: 9,
            message: 'Pet added',
        },
    }
};

export const makeToast = (type, toastObjType) => {
    if(Toasts[type][toastObjType].hasOwnProperty('message') && Toasts[type][toastObjType].hasOwnProperty('id')){
        let toastObj = Toasts[type][toastObjType];
        if(!toast.isActive(toastObj.id)) {
            console.log('Making a ' + type + ' toast for ' + toastObjType);
            switch(type) {
                case 'Successful':
                    toast.success(toastObj.message, {toastId: toastObj.id});
                    break;
                case 'Unsuccessful':
                    toast.error(toastObj.message, {toastId: toastObj.id});
                    break;
                default:
                    toast.info(toastObj.message, {toastId: toastObj.id, autoClose: 5000});
            }
        } else {
            console.log('Already active ' + type + ' ' + toastObjType + ' toast.');
        }
    } else {
        console.error('Error in toast object.');
    }
};