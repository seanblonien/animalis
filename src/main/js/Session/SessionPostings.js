import * as Validation from 'js/alloy/utils/validation';
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

function formatTime(t){
    if(t){
        let time = t.split(':');
        let hour = parseInt(time[0]);
        let minutes = (time[1]);
        let AMPM = hour < 12 ? 'AM' : 'PM';
        if(hour < 1) hour = 12;
        else if(hour > 13 && hour < 24) hour = hour - 12;

        return hour + ':' + minutes + ' ' + AMPM;
    }
}

class SessionPostings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usersWithSessions: new Map(),
            filter: {},
            checkedItems: new Map(),
            hasLoaded: false,
            sessionType: null,
        };
    }

    componentDidMount() {
        this.props.fetchAllSessions().then(() => {
            this.state.hasLoaded = true;
            this.setState(this.state);
        });
    }

    handleSessionTypeChange = e => {
        if (e != null) {
            this.state.sessionType = e;
            this.setState(this.state);
        }
    };

    getSessionDetails = (session) => {
        let principal = session.ownerPrincipal;
        if (this.state.usersWithSessions.has(principal)) {
            let x = this.state.usersWithSessions.get(principal);
            session.details = !session.details;
            console.log(JSON.stringify(x));
            this.state.usersWithSessions.set(principal, x);
            this.setState(this.state);
        } else {
            console.log('Getting public user with principal ' + (principal));
            getPublicUser(principal).then((res) => {
                session.details = true;
                this.state.usersWithSessions.set(principal, res);
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
                            const a = new Date(session.startDate);
                            const b = new Date(self.state.filter.startDate);
                            console.log((a >= b).toString());
                            if (!(a >= b)) result = false;
                            break;
                        }
                        case 'endDate': {
                            const a = new Date(session.endDate);
                            const b = new Date(self.state.filter.endDate);
                            console.log((a <= b).toString());
                            if(!(a <= b)) result =  false;
                            break;
                        }
                        case 'startTime': {
                            const a = new Date(session.startTime);
                            const b = new Date(self.state.filter.startTime);
                            console.log((a >= b).toString());
                            if(!(a >= b)) result =  false;
                            break;
                        }
                        case 'endTime': {
                            const a = new Date(session.endTime);
                            const b = new Date(self.state.filter.endTime);
                            console.log((a <= b).toString());
                            if(!(a <= b)) result =  false;
                            break;
                        }
                        case 'sessionType': {
                            if((session.sessionType !== self.state.filter.sessionType)) result =  false;
                            break;
                        }
                        case 'price': {
                            if((session.price > self.state.filter.price)) result = false;
                            break;
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

                            <label>Session Type</label>
                            <Bessemer.Select style={{marginBottom: '2.5%'}} name="sessionType"
                                             label={'Session Type'}
                                             friendlyName="Session Type" placeholder={sessionTypes[0].label}
                                             options={sessionTypes} value={this.state.sessionType}
                                             onChange={opt => this.handleSessionTypeChange(opt)}/>

                            <Bessemer.Field name="price" friendlyName="Price"
                                            field={<input type="number"
                                                          className={'form-control'}/>}/>

                            <Bessemer.Button loading={submitting}>Apply Filter</Bessemer.Button>
                        </div>
                    </form>
                </div>
                `
                {/* Postings Listing */}
                <div className="col-md-5">
                    <h4>All Session Postings</h4>
                    {this.state.hasLoaded?
                        <div>
                            {!_.isNil(this.props.allSessions) && this.props.allSessions.length > 0?
                                <div>
                                    {this.props.allSessions.map(session => (
										session.startDate >= getCurrentDate() &&
										this.isInFilter(session) &&
                                            !_.isEmpty(session.sitterPrincipal) &&
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
                                                                onClick={() => this.getSessionDetails(session)}> Get
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
                                                        <span className="text-muted">From: </span>{formatDate(session.startDate) + ' at ' + formatTime(session.startTime)}
                                                    </div>
                                                </li>

                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">To: </span>{formatDate(session.endDate) + ' at ' + formatTime(session.endTime)}
                                                    </div>
                                                </li>

                                                <li className="list-group-item">
                                                    <div>
                                                        <span className="text-muted">Price: </span>{_.isDefined(session.price) && !_.isNil(session.price) ? '$' + session.price + '/hr' : 'Not set!'}
                                                    </div>
                                                </li>

                                                {/*Pet owner details*/}
                                                {this.state.usersWithSessions.has(session.ownerPrincipal) && session.details &&
                                                    <span>
                                                        <li className="list-group-item">
                                                            <div>
                                                                <span className="text-muted">Owner: </span>{this.state.usersWithSessions.get(session.ownerPrincipal).attributes.fname + ' ' +
                                                            this.state.usersWithSessions.get(session.ownerPrincipal).attributes.lname}
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <div>
                                                                <span className="text-muted">Pets: </span>{session.pets.length > 0 ? session.pets.toString() : 'No pets'}
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item">
                                                            <div>
                                                                <span className="text-muted">Bidders: </span>{session.bidderPrincipals.length > 0 ? session.bidderPrincipals.toString() : 'No bidders'}
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <div className={'container-fluid'}>
                                                                <div style={{textAlign: 'center'}}
                                                                     className={'row justify-content-center'}>
                                                                    <button className={'btn btn-danger col-6'}
                                                                            onClick={() => this.bid(session)}> Bid
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </span>
                                                }
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
