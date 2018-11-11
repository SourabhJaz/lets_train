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
import {logout} from './actions/loginActions';

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
  getAllCategories(){
      let params = {
          url: 'http://127.0.0.1:8000/api/category/',
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
     if(!this.props.loginAuthorized)
        this.props.history.push("/login");        
  }
  componentDidMount(){
    this.getAllCategories();
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
          <Tabs value={value} onChange={this.handleChange} 
            centered >
            <Tab label="Categories" />
            <Tab label="Department Trainings" />
            <Tab label="Assignments" />
            <Tab label="Profile" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><CategoryTraining  /></TabContainer>}
        {value === 1 && <TabContainer><DepartmentTraining /></TabContainer>}
        {value === 2 && <TabContainer><Assignment /></TabContainer>}
        {value === 3 && <TabContainer><Profile /></TabContainer>}
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
    username:state.authLogin.username,
    token:state.authLogin.token    
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(EmployeeApp);
