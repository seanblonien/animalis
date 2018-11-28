import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        };
    }

    get2ndIndex(data, searchStr){
        let ndx = data.indexOf(searchStr);
        return data.indexOf(searchStr, ndx + 1);
    }

    toggleNotification(event, notification) {
        notification.hasBeenRead = !notification.hasBeenRead;
        this.props.updateNotification(notification).then(() => {
            console.error('Setting state');
            this.state.toggle = !this.state.toggle;
            this.setState(this.state);
        });
    }

    async markAllAsRead(e){
        // if(_.isNil(this.props.notifications) && _.isEmpty(this.props.notifications)){
        //     const promises = this.props.notifications.map(n => {
        //         if(n.hasBeenRead === false) {
        //             n.hasBeenRead = true;
        //             await this.props
        //         }
        //     });
        // }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 text-right">
                        <div onClick={e => this.markAllAsRead(e)}><a>Mark all as read</a></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Notification</th>
                                <th scope="col">Read</th>
                            </tr>
                            </thead>
                            <tbody>
                            {_.isDefined(this.props.notifications) && !_.isEmpty(this.props.notifications) && !_.isNil(this.props.notifications) && this.props.notifications.map(notification => (
                                <tr key={notification.id}>
                                    <td>{notification.notificationType}</td>
                                    <td>{notification.notificationDate}</td>
                                    {notification.notificationType === 'newBid' &&
                                    <td>
                                        <a href={'/#/profile/' + notification.otherUserPrincipal}>{notification.dataBody.substring(0, this.get2ndIndex(notification.dataBody, ' '))}</a>
                                        <nobr>{notification.dataBody.substring(this.get2ndIndex(notification.dataBody, ' '))}</nobr>
                                    </td>
                                    }
                                    {notification.notificationType === 'chosenSitter' &&
                                    <td>

                                    </td>
                                    }
                                    {notification.notificationType !== 'newBid' && notification.notificationType !== 'chosenSitter' &&
                                    <td>{notification.dataBody}</td>
                                    }

                                    {notification.hasBeenRead === false &&
                                    <td onClick={e => this.toggleNotification(e, notification)}>🔵</td>
                                    }
                                    {notification.hasBeenRead === true &&
                                    <td onClick={e => this.toggleNotification(e, notification)}>⚪</td>
                                    }
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
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
        notifications: Users.State.getNotifications(state),
    }),
    dispatch => ({
        fetchNotifications: () => dispatch(Users.Actions.fetchNotifications()),
        updateNotification: n => dispatch(Users.Actions.updateNotification(n)),
    })
)(Notifications);

export default Notifications;
