import React from 'react';
import ChipView from '../../components/ChipView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postDepartment} from '../../actions/departmentActions';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import {API_URL} from '../../constants/configConstants';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  }
});

class Department extends React.Component{
	state = {
	    open: false,
	    department:'',
	 };
    _makeDepartmentList(){
    	let departmentList = this.props.departmentList;
    	return departmentList.map(data => {
    		return {key: data.id, 
    			label: data.department_name.toUpperCase()
    		} 
    	})
    }
	_handleClick(){
		alert("Department");
	};
	_handleDepartmentChange(event) {
        this.setState({
            department: event.target.value
        });
    };
    handleClickOpen = () => {
	    this.setState({ 
	    	open: true,
	    	department: '' 
	    });
	};
    handleClose = () => {
 	   this.setState({ open: false,
 	   department:''});
    };
    handleSubmit = () => {
    	this.setState({ open: false });
    	let formData={         
	      department_name: this.state.department
	    };
	    let params = {
	        url: `http://${API_URL}/api/department/`,
	        method: 'post',
	        formData:formData,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(postDepartment(params));
    	this.handleClose();
	};
	render() {
		const { classes } = this.props;
		const data = this._makeDepartmentList();		
		return (
			<div >
				<ChipView chipData={data} handleClick={function() { return false; }} 
				 buttonLabel="Add Department" />
				<div>
					<Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
						Add Department
					</Button>
					<Dialog
					  open={this.state.open}
					  onClose={this.handleClose}
					  aria-labelledby="form-dialog-title">
					  <DialogTitle id="form-dialog-title">Add Department</DialogTitle>
					  <DialogContent>
					    <DialogContentText>
					    Departments are the divisions made by the organisation
					    </DialogContentText>
					    <form className={classes.root} autoComplete="off">
						    <FormControl className={classes.formControl} fullWidth>
							    <TextField
							      autoFocus
							      margin="dense"
							      id="name"
							      value={this.state.department}
							      label="Department name"
							      onChange={this._handleDepartmentChange.bind(this)}
							      fullWidth
							    />
						  	</FormControl>
					  	</form>
					  </DialogContent>
					  <DialogActions>
					    <Button onClick={this.handleClose} color="primary">
					      Cancel
					    </Button>
					    <Button onClick={this.handleSubmit} color="primary">
					      Submit
					    </Button>
					  </DialogActions>
					</Dialog>
				</div>
			</div>
		);
	}	
}

function mapStateToProps(state, ownProps){
  return {
  	token: state.authLogin.token,
    departmentList:state.departmentData.departmentList || []   
  };
}


export default compose(
	withStyles(styles),
	connect(mapStateToProps))(Department);
