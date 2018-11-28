import {Loading} from 'js/Common/Loading';
import _ from 'lodash';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';

class NotificationsNavBar extends React.Component {
    intervalID = 0;

    constructor(props) {
        super(props);
        this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
        this.notificationRefresh = this.notificationRefresh.bind(this);
        NotificationsNavBar.numberOfUnreadNotifications = NotificationsNavBar.numberOfUnreadNotifications.bind(this);

        this.state = {
            hasLoadedNotifications: false,
            numberUnreadNotifications: 0,
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.notificationRefresh(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    notificationRefresh() {
            this.props.fetchNotifications().then(() => {
                this.setState({
                    hasLoadedNotifications: true,
                    numberUnreadNotifications: NotificationsNavBar.numberOfUnreadNotifications(this.props.notifications),
                });
            });
    }

    markNotificationAsRead(event, notification) {
        console.log('Marked as read!');
        notification.hasBeenRead = true;
        this.props.updateNotification(notification);
    }

    static numberOfUnreadNotifications(notifications) {
        if(_.isNil(notifications) || _.isEmpty(notifications) || notifications.length < 1){
            return -1;
        }
        let unreadNotifications = 0;
        for(let n = 0; n < notifications.length; n++){
            if(notifications[n].hasBeenRead === false) unreadNotifications++;
        }

        return unreadNotifications;
    }

    render() {
        return (
            <li className="nav-item dropdown" style={{color: 'white'}}>
                <a className="nav-link dropdown-toggle navbarFont" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'white'}}>
                    {this.state.numberUnreadNotifications > 0 &&
                    <i className="notificationBadge">{this.state.numberUnreadNotifications}</i>
                    }
                    🔔 Notifications
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {_.isArray(this.props.user.roles) &&
                    <div>
                        {this.state.hasLoadedNotifications ?
                            <div>
                                {this.state.numberUnreadNotifications < 1 &&
                                    <div className="dropdown-item">No notifications</div>
                                }
                                {this.state.numberUnreadNotifications >= 1 && this.props.notifications != null && this.props.notifications.map(n => (
                                    <div key={n.id}>
                                        {!n.hasBeenRead &&
                                        <div key={n.id} className="d-inline-flex p-1">
                                            <a className="nav-link" href="/#/notifications" className="dropdown-item">
                                                Notification {n.id}
                                            </a>
                                            <a className="btn" onClick={e => this.markNotificationAsRead(e, n)}>✔</a>
                                        </div>
                                        }
                                    </div>
                                ))}
                            </div>
                            :
                            <div>
                                <Loading/>
                            </div>
                        }
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#/notifications"><span className="fa fa-envelope-o"/> View All</a>
                        <a className="dropdown-item" onClick={this.notificationRefresh}><span className="fa fa-refresh"/> Refresh</a>
                    </div>
                    }
                </div>
            </li>
        );
    }
}

NotificationsNavBar = connect(
    state => ({
        user: Users.State.getUser(state),
        notifications: Users.State.getNotifications(state),
    }),
    dispatch => ({
        fetchNotifications: () => dispatch(Users.Actions.fetchNotifications()),
        updateNotification: n => dispatch(Users.Actions.updateNotification(n)),
    })
)(NotificationsNavBar);

export {NotificationsNavBar};
