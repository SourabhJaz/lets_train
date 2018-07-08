import React from 'react';
// import PropTypes from 'prop-types';
import {getTrainingContent} from '../../actions/trainingActions';
import { connect } from 'react-redux';
import GridView from '../../components/GridView';

class TrainingContent extends React.Component{
	componentDidMount(){
	  let training_id = this.props.id;
      let params = {
          url: 'http://127.0.0.1:8000/api/training_content/'+training_id,
          method: 'get',
          authorization: 'Token'+this.props.token
      }
      this.props.dispatch(getTrainingContent(params));       		
	}
	render() {
		return (
				<div>
					<GridView tileData={[{id:3, path:"https://www.youtube.com/watch?v=QzadqIuseGE"},{id:4, path:"https://www.youtube.com/watch?v=Moc1Ur7X3dE"}]} />
				</div>		
		);
	}		
}

function mapStateToProps(state, ownProps){
  return {
    token:state.authLogin.token,
    contentList:state.trainingData.contentList || [] 
  };
}

export default connect(mapStateToProps)(TrainingContent);
