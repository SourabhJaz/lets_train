import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_DEPARTMENTS} from '../constants/frontEndConstants';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeDepartments(data){
  return {
   type: STORE_DEPARTMENTS,
   data
 };
}

export function postDepartment(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => console.log(data)
      ).catch(
      error => console.log(error)
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
