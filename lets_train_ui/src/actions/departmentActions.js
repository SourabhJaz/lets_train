import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_DEPARTMENTS, UPDATE_DEPARTMENTS} from '../constants/frontEndConstants';
import {SUCCESS, ERROR} from '../constants/frontEndConstants';
import {setNotification} from './notificationActions';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeDepartments(data){
  return {
   type: STORE_DEPARTMENTS,
   data
 };
}

function updateDepartments(){
  return {
   type: UPDATE_DEPARTMENTS
 };
}

export function postDepartment(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => {
          dispatch(updateDepartments());
          dispatch(setNotification({
            type: SUCCESS,
            message: "Department added!"
          }))
        }
      ).catch(
      error => {
          dispatch(setNotification({
            type: ERROR,
            message: "Error in adding new department"
          }))
        }
      );
   };
}

export function getAllDepartments(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
     	data => dispatch(storeDepartments(data))
      ).catch(
     	error => console.log(error)
  	  );
   };
}
