import React from 'react';
import {
	BrowserRouter as Router,
 	Route,
 	Switch
} from 'react-router-dom';
import AdminApp from './AdminApp';
import EmployeeApp from './EmployeeApp';
import AdminLogin from './containers/admin/AdminLogin';
import EmployeeLogin from './containers/employee/EmployeeLogin';
import CustomizedSnackbars from './components/CustomizedSnackbars';

class Routes extends React.Component{
	render() {
		return (
			<div>
		        <CustomizedSnackbars />
				<Router >
					<Switch>
						<Route name="employeeApp" exact path="/" component={EmployeeApp} /> 
						<Route name="employeeLogin" path="/login" component={EmployeeLogin} />
						<Route name="adminApp" exact path="/admin/" component={AdminApp} />
						<Route name="adminLogin" path="/admin/login" component={AdminLogin} />
					</Switch>
				</Router>
			</div>
		);
	}
}
export default Routes;