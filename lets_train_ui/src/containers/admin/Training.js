import React from 'react';
// import PropTypes from 'prop-types';
import ChipView from '../../components/ChipView';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Training extends React.Component{
    _makeTrainingList(){
    	let	trainingList = this.props.trainingList;
    	return trainingList.map(data => {
    		return {key: data.id, label: data.name} 
    	})
    }
	render() {
		const data = this._makeTrainingList();
		return (
			<div >
				<ChipView chipData={data} />
				<Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Training
				</Button>
			</div>
		);
	}		

}

function mapStateToProps(state, ownProps){
  return {
    trainingList:state.trainingData.trainingList || []   
  };
}

export default connect(mapStateToProps)(Training);
