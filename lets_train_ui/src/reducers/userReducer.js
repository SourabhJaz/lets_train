import {STORE_USERS,UPDATE_USERS} from '../constants/frontEndConstants';

export function userData(state={},action){
  switch (action.type) {
   case STORE_USERS:
      let list, prev, next;
      list = action.data.results;
      prev = action.data.previous;   
      next = action.data.next;
      return Object.assign({}, state, {
        "userList":list,
        "prev":prev,
        "next":next,
        "updated":false
      });
   case UPDATE_USERS:
   	  return Object.assign({}, state, {
   	  	"updated":true
   	  })
   default:
     return state;
 }
}


