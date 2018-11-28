import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';

class MyRatings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                My ratings here
            </div>
        );
    }
}

MyRatings = connect(
    state => ({
        user: Users.State.getUser(state),
    }),
    dispatch => ({

    })
)(MyRatings);

export default MyRatings;
