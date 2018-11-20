import {toast} from 'react-toastify';

export const Toasts = {
    // Next ID 14
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
        AlreadyBidOnSession: {
            id: 10,
            type: 'Unsuccessful',
            message: 'You have already bid on this!',
        },
        OwnSession: {
            id: 11,
            type: 'Unsuccessful',
            message: 'You cannot bid on your own session!',
        },
        AuthenticationError: {
            id: 12,
            type: 'Unsuccessful',
            message: 'Error authenticating with the server!',
        }
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
        AddNotification: {
            id: 13,
            type: 'Info',
            message: 'Notification added',
        }
    }
};

export const makeToast = (thisToast) => {
    if(thisToast.hasOwnProperty('id') && thisToast.hasOwnProperty('message') && thisToast.hasOwnProperty('type')){
        if(!toast.isActive(thisToast.id)) {
            switch(thisToast.type) {
                case 'Successful':
                    toast.success(thisToast.message, {toastId: thisToast.id, className: 'toast-border'});
                    break;
                case 'Unsuccessful':
                    toast.error(thisToast.message, {toastId: thisToast.id, className: 'toast-border'});
                    break;
                default:
                    toast.info(thisToast.message, {toastId: thisToast.id, className: 'toast-border', autoClose: 4000});
            }
        } else {
            console.log('Already active ' + thisToast.type + ' ' + thisToast.message + ' toast.');
        }
    } else {
        console.error('Error in toast object!\nToast is undefined or not in proper format.');
    }
};
