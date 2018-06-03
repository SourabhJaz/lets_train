import React from 'react';
// import PropTypes from 'prop-types';
import ChipView from '../components/ChipView';
import Button from '@material-ui/core/Button';

class Training extends React.Component{
	_handleClick(){
		alert("Training");
	}
	render() {
		const data = [
	      { key: 0, label: 'Angular' },
	      { key: 1, label: 'jQuery' },
	      { key: 2, label: 'Polymer' },
	      { key: 3, label: 'React' },
	      { key: 4, label: 'Vue.js' },
	    ];		
		return (
			<div >
				<ChipView chipData={data} handleClick={this._handleClick} />
				<Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Training
				</Button>
			</div>
		);
	}		

}

export default Training;
