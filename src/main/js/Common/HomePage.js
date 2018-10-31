import React from 'react';
import * as Users from 'js/User/Users';
import {connect} from 'react-redux';
import _ from 'lodash';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {_.isDefined(this.props.user) && (this.props.user.roles.includes('OWNER')) &&
                <div>
                    <h3>Owner Home Page</h3>
                </div>
                }

                {_.isDefined(this.props.user) && (this.props.user.roles.includes('SITTER')) &&
                <div>
                    <h3>Sitter Home Page</h3>
                </div>
                }

                <div style={{
                    float: 'center', marginRight: '25%', marginLeft: '25%', marginTop: '25px',
                    borderRadius: '20px', backgroundColor: '#D5D5D5'
                }}>
                    <h1 style={{float: 'center', marginRight: '5%', marginLeft: '5%', marginTop: '5px'}}> Welcome to the
                        Tempeturs Web App Home Page! </h1>
                    <div style={{width: '100%',textAlign:'center'}}>
                        <img style={{borderRadius: '25px', padding: '2%'}}
                            src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                             height="255" width="430"/>
                    </div>
                </div>
            </div>
        );
    }
}

HomePage = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(HomePage);

export default HomePage;