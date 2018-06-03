import React from 'react';
// import PropTypes from 'prop-types';
import TableView from '../components/TableView';
import Input from '@material-ui/core/Input';
import CsvParse from '@vtex/react-csv-parse';

class User extends React.Component{
	handleData = data => {
	  this.setState({ data })
	}
	_handleClick(Page){
		if(Page<=0)
			return;
		alert("User"+Page);
	}
	render() {
		const tableHeader = [
	      { key: 0, label: 'Angular' },
	      { key: 1, label: 'jQuery' },
	      { key: 2, label: 'Polymer' },
	      { key: 3, label: 'React' },
	      { key: 4, label: 'Vue.js' },
	    ];
	    const tableBody = [
	      { key: 1, content: [1,2,3,4,5]},
	      { key: 2, content: [1,2,3,4,5]},
	      { key: 3, content: [1,2,3,4,5]},
	      { key: 4, content: [1,2,3,4,5]},
	      { key: 5, content: [1,2,3,4,5]},
	      { key: 6, content: [1,2,3,4,5]},
	    ];
	    const keys = [
		    "header1",
		    "header2",
		    "header3",
		    "header4",
		    "header5",
	    ];
		return (
			<div>
			 	<CsvParse
			      keys={keys}
			      separators={[',', ';']}
			      onDataUploaded={this.handleData}
			      render={onChange => 
			      	<Input
			        variant="outlined" color="primary"
			        id="file_upload"
			        type="file"
			        onChange={onChange} />}
			    />
				<TableView tableHeader={tableHeader} 
				tableBody={tableBody} page={0} 
				handleClick={this._handleClick}
				/>
			</div>
		);
	}		

}

export default User;
