import {NavBar} from 'js/Common/NavBar';
import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import * as Pages from 'js/Common/Pages';
import {ToastContainer} from 'react-toastify';

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ToastContainer autoClose={3000}
                                position='bottom-center'/>
                <NavBar/>
                <HashRouter>
                    <div>
                        <Route exact path='/' component={Pages.Home}/>
                        <Route exact path='/register' component={Pages.RegisterPage}/>
                        <Route exact path='/login' component={Pages.LoginPage}/>
                        <Route exact path='/my-profile' component={Pages.ProfilePage}/>
                        <Route exact path='/my-pets' component={Pages.MyPetsPage}/>
                        <Route exact path='/my-sessions' component={Pages.MySessionsPage}/>
                        <Route exact path='/my-history' component={Pages.MyHistoryPage}/>
                        <Route exact path='/my-ratings' component={Pages.MyRatingsPage}/>
                        <Route exact path='/schedule-session' component={Pages.SessionPage}/>
                        <Route exact path='/postings' component={Pages.PostingPage}/>
                        <Route exact path='/notifications' component={Pages.NotificationsPage}/>
                        <Route exact path='/public-profile/:id' component={Pages.PublicProfilePage}/>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
