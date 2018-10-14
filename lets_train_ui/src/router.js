import React from 'react';
import {
	BrowserRouter as Router,
 	Route,
 	Switch
} from 'react-router-dom';
import AdminApp from './AdminApp';
import Login from './containers/admin/Login';
import CustomizedSnackbars from './components/CustomizedSnackbars';

class Routes extends React.Component{
	render() {
		return (
			<div>
	        <CustomizedSnackbars />
			<Router >
				<Switch>
					<Route name="app" exact path="/admin/" component={AdminApp} />
					<Route name="login" path="/admin/login" component={Login} />
				</Switch>
			</Router>
			</div>
		);
	}
}
export default Routes;