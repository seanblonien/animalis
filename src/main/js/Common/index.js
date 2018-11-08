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
                <HashRouter>
                    <div>
                        <Route exact path='/' component={Pages.Home}/>
                        <Route exact path='/register' component={Pages.RegisterPage}/>
                        <Route exact path='/login' component={Pages.LoginPage}/>
                        <Route exact path='/editprofile' component={Pages.ProfilePage}/>
                        <Route exact path='/schedulesession' component={Pages.SessionPage}/>
                        <Route exact path='/scheduleposting' component={Pages.PostingPage}/>
                        <Route exact path='/history' component={Pages.HistoryPage}/>
                    </div>
                </HashRouter>
			</div>
		);
	}
}