import React from 'react';
// import PropTypes from 'prop-types';
import TableView from '../../components/TableView';
import {getUsers, addUsers} from '../../actions/userActions';
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";
import {API_URL} from '../../constants/configConstants';

class User extends React.Component{
	handleData = data => {
		let userList = this._processUserCsv(data);
		console.log(userList); 
		this._postUsers(userList);
		this.setState({ data })
	}
	_processUserCsv(data){
	   	let table = data.map(row =>{
	    	return {employee_id: row[0],
				    name: row[1].substring(0,30),
				    doj: row[2],
				    email_id: row[3],
				    employment_status: row[4],
				    employee_category: row[5],
				    business: row[6],
				    unit:row[7],	
				    function: row[8],
				    department:row[9],
				    role: row[10],
				    designation: row[11],
				    functional_appraiser: row[12],
				    functional_appraiser_id: row[13]?row[13]:0,
				    location: row[14],
				    effective_from: row[15],	
				    emp_count: row[16]}
	    });
	    let filteredUsers = table.filter(row => {
	    	return !isNaN(parseInt(row.employee_id,10));
	    })
	   	return filteredUsers;
	}
	_postUsers(userList){
		let postList = userList.map(data => {
		let password = this._createRandomPassword();
			return {
				  "username":data.employee_id,
				  "first_name":data.name,
				  "email":data.email_id,
				  "password":password,
				  "userprofile":{
				  	  "employee_code":data.employee_id,
				      "department_id": this._findDepartmentId(data.department),
				      "business_unit": data.business,
				      "unit": data.unit,
				      "function": data.function,
				      "location": data.location,
				      "manager_code": data.functional_appraiser_id,
				      "manager_name": data.functional_appraiser
				  },
				  "is_staff": false				
			}
		});
	    let params = {
	        url: `http://${API_URL}/api/user/`,
	        method: 'post',
	        formData:postList,
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(addUsers(params));
	}
	_createRandomPassword(){
		const str = `abcdefghijklmn`+
		`opqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#`;
		let passwordLength = Math.ceil(Math.random()*4)+3;
		let password = '', index;
		while(passwordLength--){
			index = Math.floor(Math.random()*64);
			password += str[index];
		}
		return password;
	}
	_findDepartmentId(departmentName){
		let departmentLowerCase = departmentName.toLowerCase();
		let department = this.props.departmentList.find(data => {
			return departmentLowerCase === data.department_name;
		});
		if(department)
			return department.id;
		return undefined;
	}
	prevClick(){
		let prevLink = this.props.prevLink;
		let params = {
	        url: prevLink,
	        method: 'get',
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(getUsers(params));   	
	}
	nextClick(){
		let nextLink = this.props.nextLink;
		let params = {
	        url: nextLink,
	        method: 'get',
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(getUsers(params));   	
	}
	getAllUsers(){
		let params = {
	        url: `http://${API_URL}/api/user/`,
	        method: 'get',
	        authorization: 'Token '+this.props.token
	    }
	    this.props.dispatch(getUsers(params));   
	}
    componentDidMount(){
    	this.getAllUsers();
    }
 	componentWillReceiveProps(nextProps){
    	if(nextProps.userUpdated)
    		this.getAllUsers();
    }
    _makeUserList(){
    	let userList = this.props.userList;
    	return userList.map(data => {
    		return {key: data.id, 
    			    content: [data.email, data.first_name, 
    				data.userprofile.employee_code, 
    				data.userprofile.business_unit,data.userprofile.unit, 
    				data.userprofile.function, data.userprofile.location, 
    				data.userprofile.manager_code]} 
    	})
    }	
	render() {
		const tableHeader = [
	      { key: 0, label: 'Email' },
	      { key: 1, label: 'Name' },
	      { key: 2, label: 'Employee code' },
	      { key: 3, label: 'Business Unit' },
	      { key: 4, label: 'Unit' },
	      { key: 5, label: 'Function' },
	      { key: 6, label: 'Location' },
	      { key: 7, label: 'Manager Code' },	      
	    ];
	    const tableBody = this._makeUserList();
		return (
			<div>
			<CSVReader
      			cssClass="react-csv-input"
      			label="Select CSV file  "
      			onFileLoaded={this.handleData}
    		/>
				<TableView tableHeader={tableHeader} 
				tableBody={tableBody}
				prevClick={this.prevClick.bind(this)}
				nextClick={this.nextClick.bind(this)}
				/>
			</div>
		);
	}		

}

function mapStateToProps(state, ownProps){
  return {
  	token: state.authLogin.token,
    userList:state.userData.userList || [],
    prevLink:state.userData.prev || null,
    nextLink:state.userData.next || null,
    userUpdated:state.userData.updated,
    departmentList:state.departmentData.departmentList || []        
  };
}


export default connect(mapStateToProps)(User);