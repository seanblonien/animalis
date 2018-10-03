import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import * as Pages from 'js/pages';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Pages.Home} />
					<Route exact path="/register" component={Pages.RegisterPage} />
					<Route exact path="/login" component={Pages.LoginPage} />
					<Route exact path="/editprofile" component={Pages.EditProfile} />
					<Route exact path="/schedulesession" component={Pages.ScheduleSession} />
					<Route exact path="/rate" component={Pages.Rate} />
                    <Route exact path="/testendpoint" component={Pages.TestEndpoint} />
				</div>
			</HashRouter>
		);
	}
}