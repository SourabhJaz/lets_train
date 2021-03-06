import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_USERS,UPDATE_USERS} from '../constants/frontEndConstants';
import {SUCCESS, ERROR} from '../constants/frontEndConstants';
import {setNotification} from './notificationActions';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeUsers(data){
  return {
   type: STORE_USERS,
   data
 };
}

function updateUsers(){
	return {
		type: UPDATE_USERS
	}
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
      data => {
      	dispatch(updateUsers());
      	dispatch(setNotification({
            type: SUCCESS,
            message: "Users added!"
         }))
      }).catch(
      error => {
          dispatch(setNotification({
            type: ERROR,
            message: "Error adding new users"
          }))
      });
   };
}
