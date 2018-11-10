import React from 'react';
// import PropTypes from 'prop-types';
import ChipView from '../../components/ChipView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postTraining} from '../../actions/trainingActions';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

class Training extends React.Component{
	state = {
	    open: false,
	    training:'',
	    category:''
	 };	
    _makeTrainingList(){
    	let	trainingList = this.props.trainingList;
    	return trainingList.map(data => {
    		return {key: data.id, label: data.name} 
    	})
    }
	_handleTrainingChange(event) {
        this.setState({
            training: event.target.value
        });
    };
    _handleSelect(event){
        this.setState({
            category: event.target.value
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
    	let formData={         
	      'name': this.state.training,
	      'category_id': this.state.category,
	      'details': {}
	    };
	    let params = {
	        url: 'http://127.0.0.1:8000/api/training/',
	        method: 'post',
	        formData:formData,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(postTraining(params));	
	};
	render() {
		const data = this._makeTrainingList();
		const categoryList = this.props.categoryList;		
		return (
			<div >
				<ChipView chipData={data} handleClick={function() { return false; }}/>
				<Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Training
				</Button>
				<Dialog
				  open={this.state.open}
				  onClose={this.handleClose}
				  aria-labelledby="form-dialog-title">
				  <DialogTitle id="form-dialog-title">Add training</DialogTitle>
				  <DialogContent>
				    <DialogContentText>
				    Enter the training name
				    </DialogContentText>
				    <TextField
				      autoFocus
				      margin="dense"
				      id="name"
				      value={this.state.training}
				      label="Training name"
				      onChange={this._handleTrainingChange.bind(this)}
				      fullWidth
				    />
					<InputLabel htmlFor="select-category">Select category</InputLabel>				    
					<Select
						value={this.state.category}
						onChange={this._handleSelect.bind(this)}
						input={<Input id="select-category" />}
					>
					{categoryList.map(data=>
						(<MenuItem
						key={data.id}
						value={data.id}>
						{data.category_name}
						</MenuItem>)
					)}
					</Select>

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
		);
	}		

}

function mapStateToProps(state, ownProps){
  return {
  	token:state.authLogin.token,    
    trainingList:state.trainingData.trainingList || [],
    categoryList:state.categoryData.categoryList || []      
  };
}

export default connect(mapStateToProps)(Training);
