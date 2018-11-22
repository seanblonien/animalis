import {addNotification} from 'js/User/Users';
import React from 'react';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import {getCurrentDate} from 'js/Sesssion/ScheduleSession';

class MySessions extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSessions();
        this.state = {
            sitter_choice: '',
        };
        this.handleSitterChoice = this.handleSitterChoice.bind(this);
        this.getBidders = this.getBidders.bind(this);
    }

    handleSitterChoice = e => {
        if (e != null) {
            this.state.sitter_choice = e;
            this.forceUpdate();
        }
    };

    getBidders(bidders){
        let list = [];
        let i;
        for(i = 0; i < bidders.length; i++){
            list.push({label: bidders[i], value: bidders[i]});
        }

        return list;
    }

    chooseSitter(session){
        session.sitterPrincipal = this.state.sitter_choice;
        session.bidderPrincipals.splice(session.bidderPrincipals.indexOf(this.state.sitter_choice), 1);

        let newNotification = {
            id: Math.round(Date.now() + Math.random()),
            notificationType: 'chosenSitter',
            notificationDate: getCurrentDate().toString(),
            primaryPrincipal: session.sitterPrincipal,
            otherUserPrincipal: session.ownerPrincipal,
            dataBody: 'Congratulations, you have been chosen as the sitter for an upcoming session!',
            hasBeenRead: false,
        };
        addNotification(newNotification);
        this.props.updateSession(session);
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div>
                        {_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) &&
                            <h6>{this.props.user.attributes.fname} {this.props.user.attributes.lname}</h6>
                        }
                        {_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) && this.props.user.roles.includes('OWNER') &&
                        <p>Sessions as Owner:</p>
                        }

                        {_.isDefined(this.props.sessions) && !_.isEmpty(this.props.sessions) && !_.isNil(this.props.user) && this.props.sessions.map(session => (
                                <div key={session.id} className="card" style={{width: '20rem', marginBottom: 10}}>
                                    <p>Session ID: {session.id}</p>
                                    <p>From: {session.startDate + ' ' + session.startTime}</p>
                                    <p>To: {session.endDate + ' ' + session.endTime}</p>
                                    <p>Sitter: {session.sitterPrincipal}</p>
                                    <p>Bidders: {session.bidderPrincipals !== null && session.bidderPrincipals.map((bidder) => (
                                        <span key={bidder}>{bidder}, </span>
                                    ))
                                    }</p>

                                    {
                                        session.sitterPrincipal === '' &&
                                        <div>
                                            <span className={'row'} style={{verticalAlign: 'middle', width: '100%', marginBottom: 15}}>
                                                <label className={'col-4 d-inline-block'}>Sitter Choice</label>
                                                <Bessemer.Select name="sitter_choice"
                                                                 className={'col-8 d-inline-block'}
                                                                 friendlyName="Choose Sitter" placeholder="Choose a Sitter"
                                                                 validators={[Validation.requiredValidator, Validation.safeValidator]}
                                                                 options={this.getBidders(session.bidderPrincipals)} value={this.state.sitter_choice}
                                                                 onChange={opt => this.handleSitterChoice(opt)}/>
                                            </span>
                                        </div>
                                    }

                                    {
                                        !_.isBlank(this.state.sitter_choice) &&
                                        <div className={'container-fluid'}>
                                            <div style={{textAlign: 'center'}} className={'row justify-content-center'}>
                                                <button className={'btn btn-danger '} onClick={() => this.chooseSitter(session)}>Confirm Sitter Choice</button>
                                            </div>
                                        </div>
                                    }

                                    <p>Pets:</p>
                                    <p>Notes: {session.notes}</p>
                                </div>
                            ))
                        }

                        {_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user) && this.props.user.roles.includes('SITTER') &&
                        <p>Sessions as Sitter:</p>

                        }
                    </div>
                </div>
            </div>
        );
    }
}

MySessions = ReduxForm.reduxForm({form: 'mySessions'})(MySessions);

MySessions = connect(
    state => ({
        sessions: Users.State.getSessions(state),
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        getSessions: () => dispatch(Users.Actions.getSessions()),
        updateSession: (session) => dispatch(Users.Actions.updateSession(session)),
    })
)(MySessions);

export default MySessions;
