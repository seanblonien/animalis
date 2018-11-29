import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/Users';
import {Loading} from 'js/Common/Loading';
import _ from 'lodash';

class MyRatings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          hasLoaded: false,
            ratings: null,
        };
    }

    componentDidMount() {
        this.props.fetchRatings().then(() => {
            this.state.hasLoaded = true;
            this.setState(this.state);
        });
    }

    render() {
        return (
            <div>
                {this.state.hasLoaded ?
                    <div className="d-flex">
                        {_.isDefined(this.props.ratings) && !_.isEmpty(this.props.ratings) && !_.isNil(this.props.user) ? this.props.ratings.map(rating => (
                            <div key={rating.id}>
                                <div className="card-header">
                                    <div className={'mt-1'}>
                                        <p>rating.rater</p>
                                    </div>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        )) : <div><p>No ratings yet!</p></div>
                        }
                    </div>
                    :
                    <Loading/>
                }
            </div>
        );
    }
}

MyRatings = connect(
    state => ({
        user: Users.State.getUser(state),
        ratings: Users.State.getRatings(state),
    }),
    dispatch => ({
        fetchRatings: () => dispatch(Users.Actions.fetchRatings()),
    })
)(MyRatings);

export default MyRatings;
