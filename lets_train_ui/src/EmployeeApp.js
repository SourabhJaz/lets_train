import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DepartmentTraining from './containers/employee/DepartmentTraining';
import CategoryTraining from './containers/employee/CategoryTraining';
import Assignment from './containers/employee/Assignment';
import Profile from './containers/employee/Profile';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {getAllCategories} from './actions/categoryActions';
import {loginRequest, logout} from './actions/loginActions';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import Domain from '@material-ui/icons/Domain';
import School from '@material-ui/icons/School';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {API_URL} from './constants/configConstants';

const theme = createMuiTheme({
  palette: {
    primary: blue 
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: theme.spacing.unit*2 }}>
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
  },
  grow: {
    flexGrow: 1,
  },
});

class EmployeeApp extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  getAllCategories(){
      let params = {
          url: `http://${API_URL}/api/category/`,
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getAllCategories(params));       
  }
  logoutRequest(){
      this.props.dispatch(logout());
      this.props.history.push("/login");              
  }
  componentWillMount() {
     if(this.props.loginAuthorized){
        this.getAllCategories();
     }
     else if(sessionStorage.getItem('token') 
      && sessionStorage.getItem('username')){
        Promise.resolve()
          .then(() => {
            return this.props.dispatch(loginRequest());
          })
          .then(() => {
            this.getAllCategories();
          });
       }else{
          this.props.history.push("/login");     
       }   
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <FitnessCenter />
              <Typography variant="headline" color="inherit" className={classes.grow}>
                Let's Train
              </Typography>
              <Button variant="raised" color="secondary" onClick={this.logoutRequest.bind(this)} >
                Log out
              </Button>
            </Toolbar>
          </AppBar>
          <Tabs value={value} fullWidth onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary">
            <Tab label="Categories" icon={<Domain />} />
            <Tab label="Department Trainings" icon={<School />} />
            <Tab label="Assignments" disabled icon={<AssignmentInd />} />
            <Tab label="Profile" disabled icon={<AccountCircle />} />
          </Tabs>
          {value === 0 && <TabContainer><CategoryTraining  /></TabContainer>}
          {value === 1 && <TabContainer><DepartmentTraining /></TabContainer>}
          {value === 2 && <TabContainer><Assignment /></TabContainer>}
          {value === 3 && <TabContainer><Profile /></TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }
}

EmployeeApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps){
  return {
    loginAuthorized:state.authLogin.loginAuthorized,
    username:state.authLogin.username,
    token:state.authLogin.token    
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(EmployeeApp);
