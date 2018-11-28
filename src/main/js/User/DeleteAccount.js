import React from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';

class DeleteAccount extends React.Component {
    onSubmit = () => {
        return this.props.deleteAccount(this.props.user);
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {handleSubmit, submitting} = this.props;

        if (this.props.user == null) {
            return <Redirect to='/'/>;
        }

        return (
            <form name="form" action={'/'} onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <p>To delete your account, please write "<span className="font-weight-bold font-italic">Delete my account.</span>"
                    to confirm that you really want to delete your account. Once deleted, the account cannot be
                    recovered.</p>
                <Bessemer.Field name="confirmDeletion" friendlyName="Confirm Deletion"
                                validators={[Validation.requiredValidator, Validation.deleteValidator]}
                                field={<input className="form-control" type="textbox"/>}/>

                <Bessemer.Button loading={submitting}> Delete Account </Bessemer.Button>
            </form>
        );
    }
}

DeleteAccount = ReduxForm.reduxForm({form: 'deleteAccount'})(DeleteAccount);

DeleteAccount = connect(
    state => ({
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        deleteAccount: (user) => dispatch(Users.Actions.deleteAccount(user))
    })
)(DeleteAccount);

export { DeleteAccount };
