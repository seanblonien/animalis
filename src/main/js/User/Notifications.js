import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    get2ndIndex(data, searchStr){
        let ndx = data.indexOf(searchStr);

        return data.indexOf(searchStr, ndx + 1);
    }

    markNotificationAsRead(event, notification) {
        notification.hasBeenRead = !notification.hasBeenRead;
        this.setState(this.state);
        this.props.updateNotification(notification).then(() => {

        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Notification</th>
                                    <th scope="col">{/*Read Column (Intentionally Empty)*/}</th>
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
                                        {notification.notificationType !== 'newBid' &&
                                            notification.notificationType !== 'chosenSitter' &&
                                            <td>{notification.dataBody}</td>
                                        }

                                        {notification.hasBeenRead === false &&
                                        <td onClick={e => this.markNotificationAsRead(e, notification)}>🔵</td>
                                        }
                                        {notification.hasBeenRead === true &&
                                            <td onClick={e => this.markNotificationAsRead(e, notification)}>⚪</td>
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
