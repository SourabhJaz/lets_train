import {STORE_DEPARTMENTS,UPDATE_DEPARTMENTS} from '../constants/frontEndConstants';

export function departmentData(state={},action){
  switch (action.type) {
   case STORE_DEPARTMENTS:
      let list = action.data;   
      return Object.assign({}, state, {
        "departmentList":list,
        "updated":false
      });
   case UPDATE_DEPARTMENTS:
      return Object.assign({}, state, {
        "updated":true
      });   	   	
   default:
     return state;
 }
}


