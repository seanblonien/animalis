import {Loading} from 'js/Common/Loading';
import {getPublicUser} from 'js/User/Users';
import * as Users from 'js/User/Users';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';

export class PublicProfile extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasLoaded: false,
            user: null,
        };

        getPublicUser(this.props.match.params.id).then(user => {
            this.state.hasLoaded = true;
            this.state.user = user;
            this.setState(this.state);
        });
    }
    //TODO better format and display user information
    render() {
        return (
            <div>
                <h1>ID: {this.props.match.params.id}</h1>
                {this.state.hasLoaded ?
                    <div>
                        {_.isNil(this.state.user) ?
                            <div>
                                Sorry, that user does not exist!
                            </div>
                            :
                            <div>
                                {JSON.stringify(this.state.user)}
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <Loading/>
                    </div>
                }
            </div>
        );
    }
}

PublicProfile = connect(
    state => ({
        user: Users.State.getUser(state)
    })
)(PublicProfile);
