import React from 'react';
import {getAllTrainings} from '../../actions/trainingActions';
import Training from './Training';
import { connect } from 'react-redux';
import {API_URL} from '../../constants/configConstants';

class DepartmentTraining extends React.Component{
    getUserTrainings(){
      let username = this.props.username;
      let params = {
          url: `http://${API_URL}/api/user/${username}/department_training/`,
          method: 'get',
          authorization: 'Token '+this.props.token
      }
      this.props.dispatch(getAllTrainings(params));       
    }
    componentDidMount(){
	    this.getUserTrainings();
	}
	render() {
		return (
			<div >
				<Training />
			</div>
		);
	}	
}

function mapStateToProps(state, ownProps){
  return {
  	token: state.authLogin.token,
    username:state.authLogin.username,
  };
}

export default connect(mapStateToProps)(DepartmentTraining);
