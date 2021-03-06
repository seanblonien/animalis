import React from 'react';
import * as Users from 'js/User/Users';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';
import _ from 'lodash';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: '100%', textAlign: 'center', display: 'block'}}>
                <img style={{borderRadius: '10px', padding: '2%'}}
                     src="https://i.imgur.com/z2x66Oa.png"
                     height="408" width="974"/>

                {_.isDefined(this.props.user) && !_.isNil(this.props.user) && !_.isEmpty(this.props.user)?
                    <div>
                        <h1 style={{float: 'center', marginRight: '5%', marginLeft: '5%', marginTop: '5px'}}>Welcome
                            back to <b>Animalis</b>, {this.props.user.attributes.fname}!</h1>

                        <div>
                            {this.props.user.roles.includes('OWNER') &&
                            <div className="m-3">
                                <a className="btn btn-primary btn-lg" href="#/schedule-session">Schedule a pet
                                    service</a>
                            </div>
                            }
                            {this.props.user.roles.includes('SITTER') &&
                            <div>
                                <a className="btn btn-primary btn-lg"
                                   href="#/postings">Look for open pet service jobs</a>
                            </div>
                            }
                        </div>

                    </div>
                    :
                    <div>
                        <h1 style={{float: 'center', marginRight: '5%', marginLeft: '5%', marginTop: '5px'}}>Welcome
                            to <b>Animalis</b>!</h1>
                        <div className="container padded">
                            <div className="row">
                                <div className={'col-4 offset-md-4'}
                                     style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                                    <p>For animal lovers who need a helping hand, Animalis is the best pet sitting
                                        service because it offers all the services you need for all of your pets. </p>
                                </div>
                            </div>
                        </div>
                        <a className="btn btn-primary btn-lg"
                           href="#/register">Get Started Today</a>
                    </div>
                }

                <div className="container padded">
                    <div className="row">
                        <div className={'col-4 offset-md-4'}
                             style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                            <div>
                                <p className={'my-3'}>Check us out on Facebook!</p>
                                {renderHTML('<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fanimalissite&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=346925716039918" width="500" height="700" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allow="encrypted-media"></iframe>')}
                            </div>
                        </div>
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
