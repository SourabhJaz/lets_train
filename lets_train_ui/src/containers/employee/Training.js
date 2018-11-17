import React from 'react';
import CardView from '../../components/CardView';
import Button from '@material-ui/core/Button';
import TrainingContent from '../TrainingContent';
import {storeContent} from '../../actions/contentActions';
import { connect } from 'react-redux';

class Training extends React.Component{
	state = {
		training_id: undefined
	 };
    _makeTrainingList(){
      let trainingList = this.props.trainingList;
      return trainingList.map(data => {
        return {
          key: data.id,
          type: 'Training',
          heading: data.name.toUpperCase(),
          subheading: '',
          text: data.details.description,
          buttonText: 'Explore'
        } 
      })
    }   
    _getTrainingDetails(id){
      this.setState({
        training_id: id
      });
    }
    _resetTrainigDetails(){
      this.props.dispatch(storeContent([]));
    	this.setState({
    		training_id: undefined
    	});    	
    }
    componentDidMount() {
      window.scrollTo(0, 0)
    }
	render() {
		const data = this._makeTrainingList();	
		const training_id = this.state.training_id;	
		return (
			<div >
				{!training_id &&  <CardView cardData={data} handleClick={this._getTrainingDetails.bind(this)}/>}
        <p>
  				{training_id && <Button variant="contained" color="default" onClick={this._resetTrainigDetails.bind(this)}>
  					{'Back to Trainings'}
  					</Button>}
        </p>
				{training_id && <TrainingContent id={training_id} />}
			</div>
		);
	}	
}

function mapStateToProps(state, ownProps){
  return {
  	token: state.authLogin.token,
    trainingList:state.trainingData.trainingList || []
  };
}

export default connect(mapStateToProps)(Training);
