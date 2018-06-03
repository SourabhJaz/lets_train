import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
  }),  
  button: {
    margin: theme.spacing.unit,
  },
});

class Login extends React.Component {
	constructor(props){
	  super(props);
	  this.state={
		  username:'',
		  password:''
		};
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
		console.log(this.state);
	}
	render() {
    const { classes } = this.props;
	    return (
        <div>
        <Paper className={classes.root} elevation={4}>           
          <TextField
             label="Username"
             value={this.state.username}
             onChange={this._handleUsernameChange.bind(this)}
             />
           <br/>
             <TextField
   	           label="Password"
               type="password"
	             value={this.state.password}
               onChange={this._handlePasswordChange.bind(this)}
               />
             <br/>
             <Button variant="raised" className={classes.button} onClick={this._handleClick.bind(this)}>
             	Submit
             </Button>
	      </Paper>
        </div>
	    );
	  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
