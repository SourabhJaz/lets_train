import React from 'react';
// import PropTypes from 'prop-types';
import ChipView from '../../components/ChipView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postTraining} from '../../actions/trainingActions';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
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

class Training extends React.Component{
	state = {
	    open: false,
	    training:'',
	    category:'',
	    department:'',
	    description:''
	 };	
    _makeTrainingList(){
    	let	trainingList = this.props.trainingList;
    	return trainingList.map(data => {
    		return {key: data.id, 
    			label: data.name.toUpperCase()
    		}
    	})
    }
	_handleTrainingChange(event) {
        this.setState({
            training: event.target.value
        });
    };
    _handleCategorySelect(event){
        this.setState({
            category: event.target.value
        });    	
    };
    _handleDepartmentSelect(event){
        this.setState({
            department: event.target.value
        });    	
    };
	_handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    };
    handleClickOpen = () => {
	    this.setState({ 
	    	open: true,
	    	category:'',
	    	department: '' 
	    });
	};
    handleClose = () => {
 	   this.setState({ open: false,
 	   	training:'',
	    category:'',
	    department:'',
	    description:''});
    };
    handleSubmit = () => {
    	this.setState({ open: false });
    	let formData={         
	      name: this.state.training,
	      category: this.state.category,
	      department: this.state.department,
	      details: {
	      	description: this.state.description
	      }
	    };
	    let params = {
	        url: `http://${API_URL}/api/training/`,
	        method: 'post',
	        formData:formData,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(postTraining(params));	
    	this.handleClose();	
	};
	render() {
		const { classes } = this.props;
		const data = this._makeTrainingList();
		const categoryList = this.props.categoryList;	
		const departmentList = this.props.departmentList;	
		return (
			<div>
				<Button variant="contained" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Training
				</Button>
				<ChipView chipData={data} handleClick={function() { return false; }}/>
				<Dialog
				  open={this.state.open}
				  onClose={this.handleClose}
				  aria-labelledby="form-dialog-title">
				  <DialogTitle id="form-dialog-title">Add training</DialogTitle>
				  <DialogContent>
				    <form className={classes.root} autoComplete="off">
					    <FormControl className={classes.formControl} fullWidth>
						    <TextField
						      autoFocus
						      margin="dense"
						      id="name"
						      value={this.state.training}
						      label="Training name"
						      onChange={this._handleTrainingChange.bind(this)}
						      fullWidth
						    />
					    </FormControl>
					    <FormControl className={classes.formControl} fullWidth>
							<InputLabel htmlFor="select-category">Select category</InputLabel>				    
							<Select
								value={this.state.category}
								onChange={this._handleCategorySelect.bind(this)}
								input={<Input id="select-category" />}
							>
							{categoryList.map(data=>
								(<MenuItem
								key={data.id}
								value={data.id}>
								{data.category_name.toUpperCase()}
								</MenuItem>)
							)}
							</Select>
						</FormControl>
					    <FormControl className={classes.formControl} fullWidth>					
							<InputLabel htmlFor="select-category">Select department</InputLabel>				    
							<Select
								value={this.state.department}
								onChange={this._handleDepartmentSelect.bind(this)}
								input={<Input id="select-department" />}
							>
							{departmentList.map(data=>
								(<MenuItem
								key={data.id}
								value={data.id}>
								{data.department_name.toUpperCase()}
								</MenuItem>)
							)}
							</Select>
						</FormControl>
					    <FormControl className={classes.formControl} fullWidth>
						    <TextField
						      autoFocus
						      multiline
						      margin="dense"
						      id="name"
						      value={this.state.description}
						      label="Description"
						      onChange={this._handleDescriptionChange.bind(this)}
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
		);
	}		

}

function mapStateToProps(state, ownProps){
  return {
  	token:state.authLogin.token,    
    trainingList:state.trainingData.trainingList || [],
    departmentList:state.departmentData.departmentList || [],
    categoryList:state.categoryData.categoryList || []      
  };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps))(Training);
