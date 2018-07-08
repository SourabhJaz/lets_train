import {STORE_USERS} from '../constants/frontEndConstants';

export function userData(state={},action){
  switch (action.type) {
   case STORE_USERS:
      let list = action.data.results;   
      return Object.assign({}, state, {
        "userList":list
      });
   default:
     return state;
 }
}


