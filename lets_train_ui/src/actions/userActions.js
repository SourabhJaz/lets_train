import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_USERS} from '../constants/frontEndConstants';
/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeUsers(data){
  return {
   type: STORE_USERS,
   data
 };
}


export function getUsers(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
     	data => dispatch(storeUsers(data))
      ).catch(
     	error => console.log(error)
  	  );
   };
}

export function addUsers(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => console.log(data)
      ).catch(
      error => console.log(error)
      );
   };
}
