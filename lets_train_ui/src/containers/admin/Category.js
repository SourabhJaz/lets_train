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
    		return {key: data.id, 
    			label: data.category_name.toUpperCase()
    		} 
    	})
    };
    handleClickOpen = () => {
	    this.setState({ 
	    	open: true,
	    	department: '' 
	    });
	};
    handleClose = () => {
 	   this.setState({ open: false,
 	   	category:''});
    };
    handleSubmit = () => {
    	this.setState({ open: false });
    	let formData={         
	      category_name: this.state.category
	    };
	    let params = {
	        url: `http://${API_URL}/api/category/`,
	        method: 'post',
	        formData:formData,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(postCategory(params));
    	this.handleClose();
	};    
	render() {
		const { classes } = this.props;
		const data = this._makeCategoryList();
		return (
			<div >
				<Button variant="contained" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Category
				</Button>
				<ChipView chipData={data} handleClick={function() { return false; }} />
				<Dialog
				  open={this.state.open}
				  onClose={this.handleClose}
				  aria-labelledby="form-dialog-title">
				  <DialogTitle id="form-dialog-title">Add category</DialogTitle>
				  <DialogContent>
				    <DialogContentText>
				    Catogries are used to classify the trainings
				    </DialogContentText>
				    <form className={classes.root} autoComplete="off">
						<FormControl className={classes.formControl} fullWidth>
						    <TextField
						      autoFocus
						      margin="dense"
						      id="name"
						      value={this.state.category}
						      label="Category name"
						      onChange={this._handleCategoryChange.bind(this)}
						      fullWidth
						    />
					    </FormControl>
				    </form>
				  </DialogContent>
				  <DialogActions>
				    <Button onClick={this.handleClose} color="primary">
				      Cancel
				    </Button>
				    <Button type='submit' onClick={this.handleSubmit} color="primary">
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


export default compose(
	withStyles(styles),
	connect(mapStateToProps))(Category);
