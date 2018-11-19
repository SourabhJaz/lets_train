import React from 'react';
// import PropTypes from 'prop-types';
import SelectView from '../../components/SelectView';
import TrainingContent from '../TrainingContent';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postTrainingContent, setContentProgress} from '../../actions/contentActions';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
  },
  paper:{
  	width: theme.spacing.unit * 25,
  	padding: theme.spacing.unit * 2,
  }
});

class Content extends React.Component{
	state = {
	    training_id: '',
	    open: false,
	    content_title:'',
	    content_description:'',
	    file_path:'',
	    training:[]	    
	};
	_handleClick(event){
		this.setState({
			training_id:event.target.value
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
    _handleDescriptionChange(event) {
        this.setState({
            content_description: event.target.value
        });
    };
    _handleSelect(event){
        this.setState({
            training: event.target.value
        });    	
    };
    _handleFile(event){
        this.setState({
            file_path: event.target.files[0]
        });    	
    }	    	
	handleClickOpen = () => {
	    this.setState({ 
	    	open: true 
	    });
	};
    handleClose = () => {
 	   this.setState({ open: false,
 	   	content_title:'',
	    content_description:'',
	    file_path:'',
	    training:[] });
    };
    handleSubmit = () => {
    	let formData = new FormData();
        formData.append('title',this.state.content_title)
        formData.append('path',this.state.file_path)
        formData.append('attributes',JSON.stringify({
        	description:this.state.content_description
        }))  
        formData.append('training',this.state.training)  
	    let params = {
	        url: `http://${API_URL}/api/content/`,
	        method: 'post',
	        formData:formData,
	        contentType: false,
	        authorization: 'Token '+this.props.token,
	        loadAction: this.props.contentProgress
	    }
	    this.props.postTrainingContent(params);    	
    	this.handleClose();
    };

	render() {
		const { classes } = this.props;
		const {trainingList, loaded, total} = this.props;
		const data = this._makeTrainingList();
		const training_id = this.state.training_id;
		return (
			<div >
				   <Button variant="contained" color="primary" component="span" onClick={this.handleClickOpen}>
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
					    <form className={classes.root} autoComplete="off">
						    <FormControl className={classes.formControl} fullWidth>
							    <TextField
							      autoFocus
							      margin="dense"
							      id="name"
							      label="Content title"
							      onChange={this._handleTitleChange.bind(this)}
							      fullWidth
							    />
						    </FormControl>	    
						    <FormControl className={classes.formControl} fullWidth>
								<InputLabel htmlFor="select-multiple-trainings">Select trainings</InputLabel>
							    <Select
						            multiple
						            value={this.state.training}
						            onChange={this._handleSelect.bind(this)}
						            input={<Input id="select-multiple-trainings" />}
						          >
								    {trainingList.map(data=>
								    	(<MenuItem
							                key={data.id}
							                value={data.id}>
							              {data.name.toUpperCase()}
							            </MenuItem>)
								    )}
							    </Select>
						    </FormControl>	    
						    <FormControl className={classes.formControl} fullWidth>
							    <Input type="file" name="Upload file" onChange={this._handleFile.bind(this)} />
							    <TextField
							      autoFocus
							      margin="dense"
							      id="name"
							      label="Content description"
							      onChange={this._handleDescriptionChange.bind(this)}
							      multiline={true}
							      fullWidth
							    />				
						    </FormControl>	   
					  </form> 
					  </DialogContent>
					  <DialogActions>
					    <Button onClick={this.handleClose} color="primary">
					      Cancel
					    </Button>
					    <Button onClick={this.handleSubmit.bind(this)} color="primary">
					      Submit
					    </Button>
					  </DialogActions>
					</Dialog>
					<SelectView menuData={data} title={'Select training to view content'} handleSelect={
                                       this._handleClick.bind(this)} />
					{training_id && loaded === 0 && <TrainingContent id={training_id} />}
					{loaded > 0 &&
					<Paper className={classes.paper}>
						<Typography variant="headline" color="textPrimary">
							{`${Math.round(loaded*100/total)}% Uploaded`}
						</Typography>
					</Paper>}
			</div>
		);
	}		
}

function mapStateToProps(state, ownProps){
  return {
  	token:state.authLogin.token,    
    trainingList:state.trainingData.trainingList || [],
    loaded:state.contentData.loaded || 0,
    total:state.contentData.total || 0    
  };
}
function mapDispatchToProps(dispatch){
	return {
		postTrainingContent: (data) => {
			dispatch(postTrainingContent(data));
		},
		contentProgress : (data) => {
			dispatch(setContentProgress(data));
		}
	}
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps))(Content);
