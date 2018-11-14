import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {authenticateUser} from '../../actions/loginActions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {loginRequest} from '../../actions/loginActions';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import FitnessCenter from '@material-ui/icons/FitnessCenter'

const theme = createMuiTheme({
  palette: {
    primary: blue 
  }
});

const styles = theme => ({
  root: theme.mixins.gutters({
    margin: 'auto',
    marginTop: theme.spacing.unit * 20,
    width: theme.spacing.unit * 40,
    rounded: true,
  }),
  toolBar:{
    margin: 'auto',
  },
  form:{
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    textAlign: 'center',
  },  
  button: {
    marginTop: theme.spacing.unit * 5,
  },
});

class EmployeeLogin extends React.Component {
	constructor(props){
	  super(props);
	  this.state={
		  username:'',
		  password:''
		};
	 }
  componentWillReceiveProps(nextProps) {
     if(nextProps.loginAuthorized && nextProps.username)  {
      nextProps.history.push("/");
     }
  }
  componentWillMount() {
     if(!this.props.loginAuthorized)  {
      if(sessionStorage.getItem('token') && sessionStorage.getItem('username')){
        this.props.dispatch(loginRequest());
        this.props.history.push("/");        
      }
   }
  } 
	_handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }
    _handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }
	_handleClick(event){
    let formData={         
      'username': this.state.username,
      'password': this.state.password,
    };

    let loginData={
      'url':'http://127.0.0.1:8000/api-token-auth/',
      'formData':formData,
      'method':'post'
    }
    this.props.dispatch(authenticateUser(loginData));

	}
	render() {
    const { classes } = this.props;
	    return (
        <MuiThemeProvider theme={theme}>
          <Paper className={classes.root} elevation={5}>           
          <AppBar position="static">
            <Toolbar className={classes.toolBar}>
              <Typography variant="headline" color="inherit">
                Let's Train
                <FitnessCenter />
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.form}>
            <TextField
               label="Username"
               fullWidth
               value={this.state.username}
               onChange={this._handleUsernameChange.bind(this)}
               />
             <br/>
               <TextField
     	           label="Password"
                 type="password"
                 fullWidth
  	             value={this.state.password}
                 onChange={this._handlePasswordChange.bind(this)}
                 />
               <br/>
               <Button variant="outlined" color="primary" size="large" 
               className={classes.button} onClick={this._handleClick.bind(this)}>
               	Sign in
               </Button>
          </div>
  	      </Paper>
        </MuiThemeProvider>
	    );
	  }
}

EmployeeLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state, ownProps){
  return {
    loginAuthorized:state.authLogin.loginAuthorized,
    username:state.authLogin.username    
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(EmployeeLogin);
