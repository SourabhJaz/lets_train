import React from 'react';
// import PropTypes from 'prop-types';
import ChipView from '../../components/ChipView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import {postCategory} from '../../actions/categoryActions';

class Category extends React.Component{
	state = {
	    open: false,
	    category:''
	 };	
	_handleCategoryChange(event) {
        this.setState({
            category: event.target.value
        });
    };
    _makeCategoryList(){
    	let categoryList = this.props.categoryList;
    	return categoryList.map(data => {
    		return {key: data.id, label: data.category_name} 
    	})
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
	      'category_name': this.state.category
	    };
	    let params = {
	        url: 'http://127.0.0.1:8000/api/category/',
	        method: 'post',
	        formData:formData,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(postCategory(params));
	};    
	render() {
		const data = this._makeCategoryList();
		return (
			<div >
				<ChipView chipData={data} handleClick={function() { return false; }} />
				<Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Category
				</Button>
				<Dialog
				  open={this.state.open}
				  onClose={this.handleClose}
				  aria-labelledby="form-dialog-title">
				  <DialogTitle id="form-dialog-title">Add category</DialogTitle>
				  <DialogContent>
				    <DialogContentText>
				    Enter the category name
				    </DialogContentText>
				    <TextField
				      autoFocus
				      margin="dense"
				      id="name"
				      value={this.state.category}
				      label="Training name"
				      onChange={this._handleCategoryChange.bind(this)}
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
		);
	}		
}

function mapStateToProps(state, ownProps){
  return {
  	token:state.authLogin.token,    
    categoryList:state.categoryData.categoryList || []   
  };
}


export default connect(mapStateToProps)(Category);
