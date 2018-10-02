import {SET_NOTIFICATION, RESET_NOTIFICATION} from '../constants/frontEndConstants';

export function notificationData(state={},action){
  switch (action.type) {
   case SET_NOTIFICATION:
      return Object.assign({}, state, {
        "type":action.data.type,
        "message":action.data.message
      });
   case RESET_NOTIFICATION:
      return Object.assign({}, state, {
        "type":null,
        "message":null
      });   
   default:
     return state;
 }
}


