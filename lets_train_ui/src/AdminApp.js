import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Department from './containers/admin/Department';
import Category from './containers/admin/Category';
import Training from './containers/admin/Training';
import Content from './containers/admin/Content';
import User from './containers/admin/User';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {getAllDepartments} from './actions/departmentActions';
import {getAllCategories} from './actions/categoryActions';
import {getAllTrainings} from './actions/trainingActions';
import {loginRequest, logout} from './actions/loginActions';
import {getUsers} from './actions/userActions';
import {API_URL} from './constants/configConstants';

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

class AdminApp extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  getAllDepartments(){
      let params = {
          url: `http://${API_URL}/api/department/`,
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getAllDepartments(params));       
  }
  getAllCategories(){
      let params = {
          url: `http://${API_URL}/api/category/`,
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getAllCategories(params));       
  }
  getAllTrainings(){
      let params = {
          url: `http://${API_URL}/api/training/`,
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getAllTrainings(params));       
  }
  getAllUsers(){
    let params = {
        url: `http://${API_URL}/api/user/`,
        method: 'get',
        authorization: 'Token '+this.props.token
    }
    this.props.dispatch(getUsers(params));   
  }
  logoutRequest(){
      this.props.dispatch(logout());
      this.props.history.push("/admin/login");              
  }
  componentWillMount() {
     if(this.props.loginAuthorized){
        this.getAllDepartments();
        this.getAllCategories();
        this.getAllTrainings();      
     }
     else if(sessionStorage.getItem('token') 
      && sessionStorage.getItem('username')){
        Promise.resolve()
        .then(() => {
          return this.props.dispatch(loginRequest());          
        })
        .then(() => {
            this.getAllDepartments();
            this.getAllCategories();
            this.getAllTrainings();
        });
      }else{
        this.props.history.push("/admin/login");        
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
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar color="default">
             <Button variant="raised" color="secondary" className={classes.button} onClick={this.logoutRequest.bind(this)} >
              Log out
             </Button>
          </Toolbar>
          <Tabs value={value} onChange={this.handleChange} color="primary"
            centered>
            <Tab label="Department" />
            <Tab label="Category" />
            <Tab label="Training" />
            <Tab label="User" />
            <Tab label="Content" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Department  /></TabContainer>}
        {value === 1 && <TabContainer><Category /></TabContainer>}
        {value === 2 && <TabContainer><Training /></TabContainer>}
        {value === 3 && <TabContainer><User  /></TabContainer>}
        {value === 4 && <TabContainer><Content /></TabContainer>}
      </div>
    );
  }
}

AdminApp.propTypes = {
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
  connect(mapStateToProps))(AdminApp);
