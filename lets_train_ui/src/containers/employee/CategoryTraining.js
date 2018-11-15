import React from 'react';
// import PropTypes from 'prop-types';
import ButtonView from '../../components/ButtonView';
import Training from './Training';
import Button from '@material-ui/core/Button';
import {getAllTrainings} from '../../actions/trainingActions';
import {setNotification} from '../../actions/notificationActions';
import {ERROR} from '../../constants/frontEndConstants';
import { connect } from 'react-redux';

class CategoryTraining extends React.Component{
	state = {
	    category:undefined
	 };	
    _makeCategoryList(){
    	let categoryList = this.props.categoryList;
    	return categoryList.map(data => {
    		return {key: data.id, 
          label: data.category_name.toUpperCase()
        } 
    	})
    }
    _getCategoryTrainings(id){
      let params = {
          url: 'http://127.0.0.1:8000/api/category/'+id+'/category_training/',
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getAllTrainings(params)); 
      this.setState({
      	category: id
      });          	
    }
    _resetCategory(){
    	this.setState({
    		category: undefined
    	});    	
    }
    _notifyAccessDenied(){
    	this.props.dispatch(setNotification({
            type: ERROR,
            message: "Access Denied to training material"
          }));
    }
    _checkForTrainingCategory(){
    	let category_id = this.state.category;
    	return this.props.trainingList.some((training) => {
    		return training.category === category_id;
    	});
    }
    componentDidUpdate(prevProps){
    	const anyTrainingInCategory = this._checkForTrainingCategory();
		const category = this.state.category;
		if(prevProps.trainingList === this.props.trainingList)
			return;
		if(category && !anyTrainingInCategory)
			this._notifyAccessDenied();    	
    }
	render() {
		const data = this._makeCategoryList();
		const category = this.state.category;
		const trainingList = this.props.trainingList;
		return (
			<div >
				{!category && <ButtonView chipData={data} handleClick={this._getCategoryTrainings.bind(this)} />}
				<p>
					{category && <Button variant="contained" color="default" onClick={this._resetCategory.bind(this)}>
						{'Back to Categories'}
						</Button>}
				</p>
				{category && trainingList.length && <Training />}
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


export default connect(mapStateToProps)(CategoryTraining);
