import React from 'react';
import ChipView from '../components/ChipView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Department extends React.Component{
	state = {
	    open: false,
	    department:'',
	  };
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
 	   this.setState({ open: false });
    };
    handleSubmit = () => {
    	this.setState({ open: false });
    	alert(this.state.department);
    };
	render() {
		const data = [
	      { key: 0, label: 'Angular' },
	      { key: 1, label: 'jQuery' },
	      { key: 2, label: 'Polymer' },
	      { key: 3, label: 'React' },
	      { key: 4, label: 'Vue.js' },
	    ];		
		return (
			<div >
				<ChipView chipData={data} handleClick={this._handleClick} 
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
					    <TextField
					      autoFocus
					      margin="dense"
					      id="name"
					      value={this.state.department}
					      label="Department name"
					      onChange={this._handleDepartmentChange.bind(this)}
					      fullWidth
					    />
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

export default Department;
