import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

Notifications = ReduxForm.reduxForm({form: 'notifications'})(Notifications);

Notifications = connect(
    state => ({
        user: Users.State.getUser(state),
        //notifications: Users.State.getAllNotifications(state),
    }),
    dispatch => ({
        //getNotifications: () => dispatch(Users.Actions.getNotifications()),
    })
)(Notifications);

export default Notifications;
