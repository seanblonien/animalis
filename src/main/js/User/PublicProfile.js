import { Loading } from 'js/Common/Loading';
import * as Users from 'js/User/Users';
import { getPublicUser } from 'js/User/Users';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';

export class PublicProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasLoaded: false,
            publicUser: null,
        };
    }

    componentDidMount() {
        getPublicUser(this.props.match.params.id).then(user => {
            this.state.hasLoaded = true;
            this.state.publicUser = user;
            this.setState(this.state);
        });
    }

    displayRoles = () => {
        let rolesStr = '';

        let len = this.state.publicUser.roles.length;

        if(len === 0){
            rolesStr = 'No role';
        } else if(len === 1){
            if(this.state.publicUser.roles[0] === 'OWNER'){
                rolesStr = 'Pet Owner';
            } else if(this.state.publicUser.roles[0] === 'SITTER'){
                rolesStr = 'Pet Sitter';
            }
        } else if(len === 2){
            rolesStr = 'Pet Owner/Sitter';
        }

        return rolesStr;
    };

    //TODO better format and display user information
    render() {
        return (
            <div>
                {this.state.hasLoaded?
                    <div>
                        {_.isEmpty(this.state.publicUser)?
                            <div>
                                <h1>Sorry, the user {this.props.match.params.id} does not exist!</h1>
                            </div>
                            :
                            <div>
                                <h1>{this.state.publicUser.attributes['fname']} {this.state.publicUser.attributes['lname']} - {this.displayRoles()}</h1>
                                <h4>Email</h4>
                                <p>{this.state.publicUser.principal}</p>
                                <h4>Pets</h4>
                                <h4>Ratings</h4>

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
