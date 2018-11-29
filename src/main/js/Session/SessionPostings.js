import { makeToast, Toasts } from 'js/Common/Toasts';
import React from 'react';
import * as Users from 'js/User/Users';
import { addNotification, getPublicUser, getUser } from 'js/User/Users';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { sessionTypes } from 'js/Session/SessionTypes';
import * as Bessemer from 'js/alloy/bessemer/components';
import { getCurrentDate } from 'js/Session/ScheduleSession';
import { Loading } from 'js/Common/Loading';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function formatDate(d){
    if(d){
        let date = new Date(d);
        let day = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();

        return month + ' ' + day + ', ' + year;
    }
}

function formatTime(d){
    if(d){
        let date = new Date(d);
        let hour = date.getHours();
        let AMPM = hour < 12 ? 'AM' : 'PM';

        return;
    }
}

class SessionPostings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usersWithSessions: new Map(),
            filter: new Map(),
            checkedItems: new Map(),
            hasLoaded: false,
        };
    }

    componentDidMount() {
        this.props.fetchAllSessions().then(() => {
            this.state.hasLoaded = true;
            this.setState(this.state);
        });
    }

    getSessionDetails = (principal) => {
        if (this.state.usersWithSessions.has(principal)) {
            let x = this.state.usersWithSessions.get(principal);
            x.details = !x.details;
            console.log(JSON.stringify(x));
            this.state.usersWithSessions.set(principal, x);
            this.setState(this.state);
        } else {
            console.log('Getting public user with principal ' + (principal));
            getPublicUser(principal).then((res) => {
                res.details = true;
                this.state.usersWithSessions.set(principal, res);
                console.log('## ' + this.state.usersWithSessions.get(principal));
                this.setState(this.state);
            });
        }
    };

    onFormSubmit = (filterForm) => {
        console.log('Filter keys: ' + Object.keys(filterForm).join(', '));
        console.log('Filter values: ' + Object.values(filterForm).join(', '));

        this.state.filter = filterForm;
    };


    bid = (session) => {
        if (session.ownerPrincipal === this.props.user.principal) {
            makeToast(Toasts.Unsuccessful.OwnSession);
            return;
        }

        for (let i = 0; i < session.bidderPrincipals.length; i++) {
            if (session.bidderPrincipals[i] === this.props.user.principal) {
                makeToast(Toasts.Unsuccessful.AlreadyBidOnSession);
                return;
            }
        }

        session.bidderPrincipals.push(this.props.user.principal);
        let newNotification = {
            id: Math.round(Date.now() + Math.random()),
            notificationType: 'newBid',
            notificationDate: getCurrentDate().toString(),
            primaryPrincipal: session.ownerPrincipal,
            otherUserPrincipal: this.props.user.principal,
            dataBody: this.props.user.attributes['fname'] + ' ' + this.props.user.attributes['lname'] + ' has bid on your session!',
            hasBeenRead: false,
        };
        addNotification(newNotification);
        this.props.updateSession(session);
    };

    isInFilter = (session) => {
        let self = this;
        if (!_.isEmpty(this.state.filter)) {
            let result = true;
            Object.keys(session).forEach(function (field) {
                if (result) {
                    switch (field) {
                        case 'startDate': {
                            console.log('Session start: ' + session.startDate);
                            console.log('Filter start: ' + self.state.filter.startDate);
                            const a = new Date(session.startDate);
                            const b = new Date(self.state.filter.startDate);
                            console.log((a >= b).toString());
                            if (!(a >= b)) result = false;
                        }
                    }
                }

            });
            return result;
        }
        return true;
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        return (
            <div className="row">
                {/* Filter Form */}
                <div className="col-md-4">
                    <h4>Filter Session Postings</h4>
                    <form name="name" onSubmit={handleSubmit(form => this.onFormSubmit(form))}>
                        <div>
                            <Bessemer.Field name="startDate" friendlyName="Start Date"
                                            field={<input type="date"
                                                          min={getCurrentDate()}
                                                          className={'form-control'}/>}/>

                            <Bessemer.Field name="startTime" friendlyName="Start Time"
                                            field={<input type="time"
                                                          className={'form-control'}/>}/>

                            <Bessemer.Field name="endDate" friendlyName="End Date"
                                            field={<input type="date"
                                                          min={getCurrentDate()}
                                                          className={'form-control'}/>}/>

                            <Bessemer.Field name="endTime" friendlyName="End Time"
                                            field={<input type="time"
                                                          className={'form-control'}/>}/>

                            <Bessemer.Button loading={submitting}>Apply Filter</Bessemer.Button>
                        </div>
                    </form>
                </div>
                {/* Postings Listing */}
                <div className="col-md-5">
                    <h4>All Session Postings</h4>
                    {this.state.hasLoaded?
                        <div>
                            {!_.isNil(this.props.allSessions) && this.props.allSessions.length > 0?
                                <div>
                                    {this.props.allSessions.map(session => (
										session.endDate >= getCurrentDate() &&
										this.isInFilter(session) &&
                                        <div key={session.id} className="card"
                                             style={{width: '20rem', marginBottom: 10}}>
                                            <div className="card-header">
                                                <div className={'row justify-content-md-center align-items-center'}>
                                                    {sessionTypes.map((type) => (
                                                        <div key={type.label}>
                                                            {type.value === session.sessionType &&
                                                            <div className={'col-4'}>
                                                                <img src={type.image} style={{height: 50, width: 50}}/>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))
                                                    }
                                                    <div className={'container-fluid col-8 mt-2'}
                                                         style={{textAlign: 'right'}}>
                                                        <button className={'btn btn-secondary'}
                                                                onClick={() => this.getSessionDetails(session.ownerPrincipal)}> Get
                                                            Details
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={'mt-1'}>
                                                    {sessionTypes.map((type) => (
                                                        <div key={type.label}>
                                                            {type.value === session.sessionType &&
                                                            <div>
                                                                <p>{type.label}</p>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))
                                                    }
                                                </div>
                                            </div>

                                            {/*Session details*/}
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">From: </span>{formatDate(session.startDate) + ' ' + session.startTime}
                                                    </div>
                                                </li>

                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">To: </span>{formatDate(session.endDate) + ' ' + session.endTime}
                                                    </div>
                                                </li>

                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">Price: </span>$30/hr
                                                    </div>
                                                </li>

                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">Pet Breeds: </span>
                                                    </div>
                                                </li>

                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">Bidders: </span>{session.bidderPrincipals.toString()}
                                                    </div>
                                                </li>

                                                {/*Pet owner details*/}
                                                {this.state.usersWithSessions.has(session.ownerPrincipal) && this.state.usersWithSessions.get(session.ownerPrincipal).details &&
                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">Owner: </span>{this.state.usersWithSessions.get(session.ownerPrincipal).attributes.fname + ' ' +
													this.state.usersWithSessions.get(session.ownerPrincipal).attributes.lname}
                                                    </div>
                                                </li>
                                                }
                                                <div className={'container-fluid'}>
                                                    <div style={{textAlign: 'center'}}
                                                         className={'row justify-content-center'}>
                                                        <button className={'btn btn-danger col-6'}
                                                                onClick={() => this.bid(session)}> Bid
                                                        </button>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    ))
                                    }
                                </div>
                                :
                                <div>
                                    <p>No sessions available!</p>
                                </div>
                            }

                            {_.isNil(this.props.allSessions) &&
                            <div>Postings is empty</div>
                            }

                        </div>
                        :
                        <Loading/>
                    }
                </div>
            </div>
        );
    }
}

SessionPostings = ReduxForm.reduxForm({form: 'sessionpostings'})(SessionPostings);

SessionPostings = connect(
    state => ({
        sessions: Users.State.getSessions(state),
        user: Users.State.getUser(state),
        allSessions: Users.State.getAllSessions(state),
    }),
    dispatch => ({
        fetchAllSessions: () => dispatch(Users.Actions.fetchAllSessions()),
        updateSession: (session) => dispatch(Users.Actions.updateSession(session)),
    })
)(SessionPostings);

export default SessionPostings;
