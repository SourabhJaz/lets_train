import React from 'react';
// import PropTypes from 'prop-types';
import SelectView from '../../components/SelectView';
import TrainingContent from './TrainingContent';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postTrainingContent} from '../../actions/trainingActions';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

class Content extends React.Component{
	state = {
	    training_id: '',
	    open: false,
	    content_title:'',
	    training:[]	    
	};
	_handleClick(value){
		this.setState({
			training_id:value
		});
	};
    _makeTrainingList(){
    	let	trainingList = this.props.trainingList;
    	return trainingList.map(data => {
    		return {key: data.id, label: data.name} 
    	})
    };
	_handleTitleChange(event) {
        this.setState({
            content_title: event.target.value
        });
    };
    _handleSelect(event){
        this.setState({
            training: event.target.value
        });    	
    }	
	handleClickOpen = () => {
	    this.setState({ 
	    	open: true 
	    });
	};
    handleClose = () => {
 	   this.setState({ open: false });
    };
    handleSubmit = () => {
    	this.setState({ open: false });
    	let formData={         
	      'title': this.state.content_title,
	      'path':'',
	      'attributes':'',
	      "training_id":this.state.training
	    };
	    let params = {
	        url: 'http://127.0.0.1:8000/api/training_content/',
	        method: 'post',
	        formData:formData,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(postTrainingContent(params));    	
    };

	render() {
		const data = this._makeTrainingList();
		const training_id = this.state.training_id;
		const trainingList = this.props.trainingList;
		return (
			<div >
				   <Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
						Add Content
					</Button>
					<Dialog
					  open={this.state.open}
					  onClose={this.handleClose}
					  aria-labelledby="form-dialog-title">
					  <DialogTitle id="form-dialog-title">Add Content</DialogTitle>
					  <DialogContent>
					    <DialogContentText>
					    Mention the relevant details
					    </DialogContentText>
					    <TextField
					      autoFocus
					      margin="dense"
					      id="name"
					      label="Content title"
					      onChange={this._handleTitleChange.bind(this)}
					      fullWidth
					    />
					    <Select
				            multiple
				            value={this.state.training}
				            onChange={this._handleSelect}
				            input={<Input id="select-multiple" />}
				          >
						    {trainingList.map(data=>
						    	(<MenuItem
					                key={data.id}
					                value={data.id}>
					              {data.name}
					            </MenuItem>)
						    )}
					    </Select>
					    <br/>
					    <input type="file" name="Upload file" />
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
				<br/>View training content
				<SelectView menuData={data} title={'Select training'} handleSelect={
					this._handleClick.bind(this)} />
				{training_id && <TrainingContent id={training_id} />}
			</div>
		);
	}		
}

function mapStateToProps(state, ownProps){
  return {
    trainingList:state.trainingData.trainingList || []   
  };
}

export default connect(mapStateToProps)(Content);
