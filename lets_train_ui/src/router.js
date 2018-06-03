import React from 'react';
import {
	BrowserRouter as Router,
 	Route,
 	Switch
} from 'react-router-dom';
import App from './App';
import Login from './containers/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Routes extends React.Component{
	render() {
		return (
			<div>
		    <AppBar position="static" color="default">
	          <Toolbar>
	            <Typography variant="title" color="inherit">
	              Let's train
	            </Typography>
	          </Toolbar>
	        </AppBar>
			<Router >
				<Switch>
					<Route name="app" exact path="/" component={App} />
					<Route name="login" path="/login" component={Login} />
				</Switch>
			</Router>
			</div>
		);
	}
}
export default Routes;