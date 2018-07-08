import {ajaxUtil} from '../utility/ajaxUtility';
import {LOGIN_SUCCESS, LOGIN_FAIL, 
  LOGIN_REQUEST} from '../constants/frontEndConstants';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function loginSuccess(data){
  return {
   type: LOGIN_SUCCESS,
   data
 };
}

/**
  * This action will dispatch when the user unauthorized, dispatching from authLoginUser action
  */
function loginFailure(data){
  return {
   type: LOGIN_FAIL,
   data
 };
}

export function loginRequest(){
  return {
   type: LOGIN_REQUEST
 };
}

export function authenticateUser(loginData){
    var promiseObject = ajaxUtil(loginData);
    return dispatch => {
     return (promiseObject).then(
     	data => dispatch(loginSuccess(data))
      ).catch(
     	error => dispatch(loginFailure(error))
  	  );
   };
}
