import {LOGIN_SUCCESS, LOGIN_REQUEST,
  LOGIN_FAIL, LOGOUT} from '../constants/frontEndConstants';

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
   case LOGIN_REQUEST:
      let sessionToken = sessionStorage.getItem('token');   
      return Object.assign({}, state, {
        "loginAuthorized":true,
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


