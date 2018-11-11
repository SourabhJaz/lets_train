import React from 'react';
// import PropTypes from 'prop-types';
import {getTrainingContent} from '../actions/contentActions';
import { connect } from 'react-redux';
import GridView from '../components/GridView';

class TrainingContent extends React.Component{
	_fetchTraining(id){
	  let training_id = id;
      let params = {
          url: 'http://127.0.0.1:8000/api/training_content/'+training_id,
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getTrainingContent(params));       		

	}
	componentDidMount(){
		this._fetchTraining(this.props.id);
	}
	componentWillReceiveProps(nextProps) {
     if(nextProps.id !== this.props.id)  {
     	this._fetchTraining(nextProps.id);
     }
  	}
	render() {
		return (
				<div>
					<GridView tileData={this.props.contentList} />
				</div>		
		);
	}		
}

function mapStateToProps(state, ownProps){
  return {
    token:state.authLogin.token,
    contentList:state.contentData.contentList || [] 
  };
}

export default connect(mapStateToProps)(TrainingContent);
