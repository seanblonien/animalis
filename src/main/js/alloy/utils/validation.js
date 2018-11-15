import _ from 'lodash';
import DomPurify from 'dompurify';

export class Validator {
    constructor(spec, error) {
        this.spec = spec;
        this.error = error;
    }
}

let Spec = {};

Spec.makeOptional = spec => val => _.isEmpty(val) ? true : spec(val);

export {Spec};

export const required = value => !!value;
export const requiredValidator = new Validator(required, (details) => details.friendlyName + ' is required.');

export const isEmail = (val) => val.match(/^[a-zA-Z0-9](\.?\+?[a-zA-Z0-9_-]){0,}@[a-zA-Z0-9-]+\.([a-zA-Z]{1,6}\.)?[a-zA-Z]{2,6}$/);
export const emailValidator = new Validator(isEmail, (details, value) => value + ' is not a valid email address.');

export const isPhoneNumber = (val) => val.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/) || val.match(/^[0-9]{10}$/) || val.match(/^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/);
export const phoneNumberValidator = new Validator(isPhoneNumber, (details, value) => value + ' is not a valid phone.');

export const isNumber = (val) => val == null || val.toString().match(/^[0-9]*$/);
export const numberValidator = new Validator(isNumber, () => 'Please enter in only numbers!');

export const isValidPassword = (val) => val.toString().length >= 6 && val.match(/^[a-zA-Z0-9!@#$%^&*]{6,64}$/);
export const passwordValidator = new Validator(isValidPassword, (details) => details.friendlyName + ' must be a valid password.');

export const isConfirmDeletion = (val) => val.match(/^Delete my account.$/);
export const deleteValidator = new Validator(isConfirmDeletion, () => 'Please enter \'Delete my account.\' exactly as it appears!');

export const isSex = (val) => val.match(/^Male|Female$/);
export const sexValidator = new Validator(isSex, () => 'Please enter \'Male\' or \'Female\' for pet sex.');

export const isSafe = (val) => !(val === sanitize(val));
export const safeValidator = new Validator(isSafe, () => 'Please enter in valid characters! No funny business allowed!');

export function sanitize(strings, ...values) {
    strings = strings ? [].concat(strings) : [];
    const dirty = isEmpty(strings) ? [] : strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`, '');
    return DomPurify.sanitize(dirty);
}

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
