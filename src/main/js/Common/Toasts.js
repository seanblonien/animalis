import {toast} from 'react-toastify';

export const Toasts = {
    Successful: {
        Login: {
            id: 1,
            type: 'Successful',
            message: 'You are now logged in',
        },
        Register: {
            id: 2,
            type: 'Successful',
            message: 'Successfully registered',
        },
        ProfileUpdate: {
            id: 3,
            type: 'Successful',
            message: 'Successfully updated user profile',
        },
        ScheduleSession: {
            id: 8,
            type: 'Successful',
            message: 'Successfully scheduled a pet service session',
        },
    },
    Unsuccessful: {
        Login: {
            id: 4,
            type: 'Unsuccessful',
            message: 'Unable to login',
        },
        Register: {
            id: 5,
            type: 'Unsuccessful',
            message: 'Unable to register',
        },
    },
    Info: {
        Logout: {
            id: 6,
            type: 'Info',
            message: 'Logged out',
        },
        RegisterEmailSent: {
            id: 7,
            type: 'Info',
            message: 'You have been sent a welcome email for registering'
        },
        AddPet: {
            id: 9,
            type: 'Info',
            message: 'Pet added',
        },
    }
};

export const makeToast = (thisToast) => {
    if(thisToast.hasOwnProperty('id') && thisToast.hasOwnProperty('message') && thisToast.hasOwnProperty('type')){
        if(!toast.isActive(thisToast.id)) {
            switch(thisToast.type) {
                case 'Successful':
                    toast.success(thisToast.message, {toastId: thisToast.id});
                    break;
                case 'Unsuccessful':
                    toast.error(thisToast.message, {toastId: thisToast.id});
                    break;
                default:
                    toast.info(thisToast.message, {toastId: thisToast.id, autoClose: 5000});
            }
        } else {
            console.log('Already active ' + thisToast.type + ' ' + thisToast.message + ' toast.');
        }
    } else {
        console.error('Error in toast object!\nToast is undefined or not in proper format.');
    }
};
