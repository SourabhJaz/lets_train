import {LOGIN_SUCCESS, LOGIN_REQUEST,
  LOGIN_FAIL, LOGOUT, LOGIN_DETAILS} from '../constants/frontEndConstants';

export function authLogin(state={},action){
  switch (action.type) {
   case LOGIN_SUCCESS:
      let token = action.data.token;   
      sessionStorage.setItem('token', token);
      return Object.assign({}, state, {
        "loginAuthorized":true,
        "token": token,
        "error": null
      });
   case LOGIN_DETAILS:
      let username = action.data.username;
      sessionStorage.setItem('username', username);
      return Object.assign({}, state, {
        "username":username
      });
   case LOGIN_REQUEST:
      let sessionToken = sessionStorage.getItem('token');  
      let sessionUsername = sessionStorage.getItem('username'); 
      return Object.assign({}, state, {
        "loginAuthorized":true,
        "username":sessionUsername,
        "token": sessionToken,
        "error": null
      });
   case LOGIN_FAIL:
      return Object.assign({}, state, {  
        "loginAuthorized":false,
        "token":null,
        "error":action.data
      });
   case LOGOUT:
      sessionStorage.removeItem('token');
      return Object.assign({}, state, {
        "loginAuthorized":false,
        "token": null,
        "error": null
      });
   default:
     return state;
 }
}


