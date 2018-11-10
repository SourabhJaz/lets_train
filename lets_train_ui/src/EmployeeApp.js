import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Department from './containers/employee/Department';
import Category from './containers/employee/Category';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {getAllDepartments} from './actions/departmentActions';
import {getAllCategories} from './actions/categoryActions';
import {getAllTrainings} from './actions/trainingActions';
import {loginRequest, logout} from './actions/loginActions';
import {getUsers} from './actions/userActions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
  },
});

class EmployeeApp extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  getAllDepartments(){
      let params = {
          url: 'http://127.0.0.1:8000/api/department/',
          method: 'get',
          authorization: 'Token'+this.props.token
      }
      this.props.dispatch(getAllDepartments(params));       
  }
  getAllCategories(){
      let params = {
          url: 'http://127.0.0.1:8000/api/category/',
          method: 'get',
          authorization: 'Token'+this.props.token
      }
      this.props.dispatch(getAllCategories(params));       
  }
  getAllTrainings(){
      let params = {
          url: 'http://127.0.0.1:8000/api/training/',
          method: 'get',
          authorization: 'Token'+this.props.token
      }
      this.props.dispatch(getAllTrainings(params));       
  }
  getAllUsers(){
    let params = {
        url: 'http://127.0.0.1:8000/api/user/',
        method: 'get',
        authorization: 'Token'+this.props.token
    }
    this.props.dispatch(getUsers(params));   
  }
  logoutRequest(){
      this.props.dispatch(logout());
      this.props.history.push("/login");              
  }
  componentWillMount() {
     if(!this.props.loginAuthorized)  {
      if(sessionStorage.getItem('token')){
        this.props.dispatch(loginRequest());
      }
      else{
        this.props.history.push("/login");        
      }
     }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.loginAuthorized)
      return;
  	if(nextProps.categoryUpdated)
  		this.getAllCategories();
  	if(nextProps.trainingUpdated)
  		this.getAllTrainings();
  	if(nextProps.departmentUpdated)
  		this.getAllDepartments();
  }
  componentDidMount(){
    this.getAllDepartments();
    this.getAllCategories();
    this.getAllTrainings();
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar color="default">
             <Button variant="raised" className={classes.button} onClick={this.logoutRequest.bind(this)} >
              Log out
             </Button>
          </Toolbar>
          <Tabs value={value} onChange={this.handleChange} color="primary">
            <Tab label="Department" />
            <Tab label="Category" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Department  /></TabContainer>}
        {value === 1 && <TabContainer><Category /></TabContainer>}
      </div>
    );
  }
}

EmployeeApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps){
  return {
    loginAuthorized:state.authLogin.loginAuthorized,
    categoryUpdated:state.categoryData.updated,
    trainingUpdated:state.trainingData.updated,
    departmentUpdated:state.departmentData.updated,
    token:state.authLogin.token    
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(EmployeeApp);
