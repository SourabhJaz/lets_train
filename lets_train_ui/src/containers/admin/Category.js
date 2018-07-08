import React from 'react';
// import PropTypes from 'prop-types';
import ChipView from '../../components/ChipView';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Category extends React.Component{
	_handleClick(){
		alert("Category");
	}
    _makeCategoryList(){
    	let categoryList = this.props.categoryList;
    	return categoryList.map(data => {
    		return {key: data.id, label: data.category_name} 
    	})
    }
	render() {
		const data = this._makeCategoryList();
		return (
			<div >
				<ChipView chipData={data} handleClick={this._handleClick} />
				<Button variant="outlined" color="primary" component="span" onClick={this.handleClickOpen}>
					Add Category
				</Button>
			</div>
		);
	}		
}

function mapStateToProps(state, ownProps){
  return {
    categoryList:state.categoryData.categoryList || []   
  };
}


export default connect(mapStateToProps)(Category);
